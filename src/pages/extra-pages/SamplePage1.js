import React, { useState, useRef, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  updateEdge,
  Background,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FiRefreshCw } from 'react-icons/fi';

import Sidebar from './Sidebar';

import CustomNode from './CustomNode';
import CustomNode1 from './CustomNode1';
import FloatingEdge from './FloatingEdge';

const STORAGE_KEY = 'reactflow_data';
// JSON.parse(localStorage.getItem(STORAGE_KEY + '_nodes')) ||

const initialNodes =  [
  { id: '1', type: 'custom', data: { label: 'Upload Document' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'custom', data: { label: 'Redline Document' }, position: { x: 200, y: -200 } },
  { id: '3', type: 'custom', data: { label: 'Research Document' }, position: { x: 400, y: 0 } },
  { id: '4', type: 'custom', data: { label: 'Run Analytics' }, position: { x: 600, y: -200 } },
];
const initialEdges = [];

// JSON.parse(localStorage.getItem(STORAGE_KEY + '_edges')) || 

const connectionLineStyle = {
  strokeWidth: 1,
  stroke: 'black',
};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: 'ArrowClosed',
    color: 'black',
  },
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const SamplePage1 = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState('');
  const edgeUpdateSuccessful = useRef(true);
  const [isModalOpen, setisModalOpen] = useState(false);

  // const saveDataToLocalStorage = (nodes, edges) => {
  //   localStorage.setItem(STORAGE_KEY + '_nodes', JSON.stringify(nodes));
  //   localStorage.setItem(STORAGE_KEY + '_edges', JSON.stringify(edges));
  // };

  // useEffect(() => {
  //   saveDataToLocalStorage(nodes, edges);
  // }, [nodes, edges]);
  
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const handleDelete = () => {
    // Find the index of the selected node in the nodes array
    const nodeIndex = nodes.findIndex((node) => node.id === selectedNodeId);

    if (nodeIndex !== -1) {
      // Create a new array without the deleted node
      const updatedNodes = [...nodes.slice(0, nodeIndex), ...nodes.slice(nodeIndex + 1)];

      // Update the nodes state with the new array
      setNodes(updatedNodes);
    }

    setisModalOpen(false);
  };


  const dialogObjs = (dialogData) => {

    console.log(dialogData);
  };


  const handleNodeDelete = (nodeId) => {
    // Find the index of the selected node in the nodes array
    const nodeIndex = nodes.findIndex((node) => node.id === nodeId);

    if (nodeIndex !== -1) {
      // Create a new array without the deleted node
      const updatedNodes = [...nodes.slice(0, nodeIndex), ...nodes.slice(nodeIndex + 1)];

      // Update the nodes state with the new array
      setNodes(updatedNodes);
    }

    setisModalOpen(false);
  };
  const removeNodeById = (nodeId) => {
    console.log(nodeId)
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  };
  const handleChangeLabel = () => {
    console.log(`Changing label for node with ID ${selectedNodeId}`);
    onChangeLabel(selectedNodeId, newLabel);
    onClose();
  };
  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  const refreshGraph = () => {
    setNodes([]);
    setEdges([]);
  };
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const isNodeOfTypeExist = nodes.some((node) => node.data.label === type);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // To handle duplicate node
      // if (isNodeOfTypeExist) {
      //   return;
      // }

      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: { label: `${type}` },
      };
      console.log('New Node:', newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes]
  );

  const openDialog = (nodeId) => {
    setSelectedNodeId(nodeId); // Set the selectedNodeId before opening the modal
    setisModalOpen(true); // Open the modal
    console.log(nodeId);
  };
  

  const closeDialog = () => {
    setSelectedNodeId(null);
  };
  
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineStyle={connectionLineStyle}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            fitView
            minZoom={0.5}
            maxZoom={1}
          >
            <Background variant={BackgroundVariant.Dots} gap={25} color='#808080' size ={3} />
            <Controls />
            <div className="refresh-button" onClick={refreshGraph}>
            <FiRefreshCw size={10} />
          </div>
          
          <CustomNode  dialogObjs = {dialogObjs} />
          <CustomNode1 dialogObjs = {dialogObjs} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default SamplePage1;
