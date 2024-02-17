import { useCallback, useState, useEffect } from 'react';
import { useStore, getStraightPath } from 'reactflow';
import { Position, getBezierPath } from 'reactflow';
import { getEdgeParams } from './utils.js';

function FloatingEdge({ id, source, target, markerEnd, style, label }) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

  
  const defaultLabel = 'label';

  const [editableLabel, setEditableLabel] = useState(label || defaultLabel);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingedge, setIsEditingedge] = useState(false);

  if (!sourceNode || !targetNode) {
    return null;
  }
  const labelStyle = {
    backgroundColor: 'white', // Set your desired background color here
    padding: '5px', // Adjust padding as needed
    borderRadius: '10px', // Optional: Add border-radius for rounded corners
  };
  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);



  // Set the marker orientation to the angle in degrees

  const [edgePath, labelX, labelY, offsetX, offsetY] = getBezierPath({
    sourceX: sx,  // Right side of the source node
    sourceY: sy,  // Center vertically on the source node
    sourcePosition: Position.Right,
    targetX: tx,  // Left side of the target node
    targetY: ty,  // Center vertically on the target node
    targetPosition: Position.Left,
    curvature: 0.1,  
  });

  // const [edgePath] = getStraightPath({
  //   sourceX: sx,
  //   sourceY: sy,
  //   targetX: tx,
  //   targetY: ty,
  // });
  const angle = Math.atan2(ty - sy, tx - sx);
  const markerOrientation = (angle * 180) / Math.PI;
  const markerRefX = Math.cos(angle) * 8; // Adjust the factor as needed
  const markerRefY = Math.sin(angle) * 8; // Adjust the factor as needed

  const textTransform = `translate(${(sx + tx) / 2},${(sy + ty) / 2})`; // Adjust the vertical position
  const dyOffset = 0;

  const handleLabelClick = () => {
    setIsEditing(true);
    const contentWidth = editableLabel.length * 8; // Adjust the factor based on your font size
    const maxWidth = 80; // Set a maximum width if needed

    const inputWidth = Math.min(contentWidth, maxWidth);
  };

  const handleLabelChange = (event) => {
    setEditableLabel(event.target.value);
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    console.log('Edge Details:', {
      id,
      source,
      target,
      markerEnd,
      style,  // If style is defined
      label,  // If label is defined
    });
  }, [id, source, target, markerEnd, style, label]);

   return (
    <>
      <defs>
        <marker
          id={`arrow-${id}`}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient={markerOrientation}
          markerUnits="userSpaceOnUse"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="black" />
        </marker>
      </defs>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={`url(#arrow-${id})`}
        style={style}
      />
      {isEditing ? (
        <foreignObject x={(sx + tx) / 2 - 50} y={(sy + ty) / 2 - 40} width="80%" height="30">
          <input
            type="text"
            value={editableLabel}
            onChange={handleLabelChange}
            onBlur={handleLabelBlur}
            autoFocus
            style={{
              width: '10%',
              height: '100%',
              boxSizing: 'border-box',
              outlineWidth: '1px',
              textAlign: 'center',
              borderRadius: '10px',
              border: '1px solid gray'
            }}
          />
        </foreignObject>
      ) : (
        <foreignObject x={(sx + tx) / 2 - 50} y={(sy + ty) / 2 - 25} width="100" height="50">
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <span onClick={handleLabelClick} style={labelStyle}>
      {editableLabel}
    </span>
  </div>
</foreignObject>
      )}
    </>
  );
}
export default FloatingEdge;
