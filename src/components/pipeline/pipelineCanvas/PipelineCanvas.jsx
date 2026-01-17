import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../../../store/pipelineStore';
import { shallow } from 'zustand/shallow';
import { APP_CONFIG } from '../../../config/constants';
import { InputNode } from '../../nodes/InputNode';
import { OutputNode } from '../../nodes/OutputNode';
import { LLMNode } from '../../nodes/LLMNode';
import { TextNode } from '../../nodes/TextNode';
import { CalculatorNode } from '../../nodes/CalculatorNode';
import { NumberNode } from '../../nodes/NumberNode';
import { ConditionalNode } from '../../nodes/ConditionalNode';
import { TransformNode } from '../../nodes/TransformNode';
import { APINode } from '../../nodes/APINode';
import { MergeNode } from '../../nodes/MergeNode';
import { NODE_CONFIG } from '../../../config/nodeConfig';
import 'reactflow/dist/style.css';
import './PipelineCanvas.css';

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  calculator: CalculatorNode,
  number: NumberNode,
  conditional: ConditionalNode,
  transform: TransformNode,
  api: APINode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);


// Update onDrop function
const onDrop = useCallback(
  (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (event?.dataTransfer?.getData('application/reactflow')) {
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = appData?.nodeType;
      if (typeof type === 'undefined' || !NODE_CONFIG[type]) return;
      
      const config = NODE_CONFIG[type];
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: { 
          id: nodeID, 
          nodeType: type,
          config: config  // ✅ Pass config to node
        },
      };
      addNode(newNode);
    }
  },
  [reactFlowInstance, getNodeID, addNode]
);


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} className="pipeline-canvas-wrapper">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        snapGrid={[APP_CONFIG.GRID_SIZE, APP_CONFIG.GRID_SIZE]}
        connectionLineType="smoothstep"
      >
        <Background color="#aaa" gap={APP_CONFIG.GRID_SIZE} />
        <Controls position="bottom-left" />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};