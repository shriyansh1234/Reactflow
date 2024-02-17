// CustomNode.jsx
import React, { useState } from 'react';
import { Handle, Position, useStore } from 'reactflow';
import Dialog from './Dialog';
import './style.css';

export default function CustomNode({ id, data}) {
  const connectionNodeId = useStore((state) => state.connectionNodeId);
  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;

  
  // State to manage whether the node is selected
  const [isSelected, setIsSelected] = useState(false);





  return (
    <div className={`customNode ${isSelected ? 'selected' : ''}`} 
    onClick={() => setIsSelected(!isSelected)}>

      {/* <Dialog
        dialogObjs={dialogObjs}
        id = {id}
        isOpen={isSelected}
        onClose={() => setIsSelected(false)}
      /> */}

      <div
        className="customNodeBody"

        style={{
          borderStyle: isTarget ? 'dashed' : 'solid',
          backgroundColor: isTarget ? '#ffcce3' : '#ccd9f6',
          
        }}
      >
        {!isConnecting && (
          <Handle className="customHandle" position={Position.Right} type="source" />
        )}

        <Handle
          className="customHandle"
          position={Position.Left}
          type="target"
          isConnectableStart={false}
        />
        {data && data.label} 
      </div>
    </div>
  );
}
