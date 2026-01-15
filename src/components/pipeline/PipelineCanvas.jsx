import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../../store/pipelineStore';
import { shallow } from 'zustand/shallow';
import { APP_CONFIG } from '../../config/constants';

// Import all nodes
import { InputNode } from '../nodes/InputNode';
import { OutputNode } from '../nodes/OutputNode';
import { LLMNode } from '../nodes/LLMNode';
import { TextNode } from '../nodes/TextNode';
import { CalculatorNode } from '../nodes/CalculatorNode';
import { NumberNode } from '../nodes/NumberNode';
import { ConditionalNode } from '../nodes/ConditionalNode';
import { TransformNode } from '../nodes/TransformNode';
import { APINode } from '../nodes/APINode';
import { MergeNode } from '../nodes/MergeNode';

import 'reactflow/dist/style.css';

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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: { id: nodeID, nodeType: type },
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
    <div
      ref={reactFlowWrapper}
      style={{
        width: '100vw',
        height: 'calc(100vh - 150px)',
        background: '#f7fafc',
        paddingBottom: '80px',
      }}
    >
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
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};