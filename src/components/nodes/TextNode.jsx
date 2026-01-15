import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './base/BaseNode';
import { useStore } from '../../store/pipelineStore';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 250, height: 120 });
  const [errors, setErrors] = useState([]);

  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onConnect = useStore((state) => state.onConnect);

  const prevConnectedNodesRef = useRef(new Map());
  const isUpdatingFromEdgeRef = useRef(false);

  // Handle edge-related text updates
  useEffect(() => {
    if (isUpdatingFromEdgeRef.current) {
      isUpdatingFromEdgeRef.current = false;
      return;
    }

    const connectedEdges = edges.filter((edge) => edge.target === id);
    const currentConnectedNodes = new Map();

    connectedEdges.forEach((edge) => {
      const sourceNode = nodes.find((node) => node.id === edge.source);
      if (sourceNode) {
        currentConnectedNodes.set(edge.id, sourceNode.id);
      }
    });

    let textNeedsUpdate = false;
    let updatedText = currText;

    // Check for ID changes
    prevConnectedNodesRef.current.forEach((oldNodeId, edgeId) => {
      const newNodeId = currentConnectedNodes.get(edgeId);

      if (newNodeId && oldNodeId !== newNodeId) {
        const oldPattern = new RegExp(
          `\\{\\{\\s*${oldNodeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\}\\}`,
          'g'
        );
        updatedText = updatedText.replace(oldPattern, `{{${newNodeId}}}`);
        textNeedsUpdate = true;
      }
    });

    // Check for new connections
    currentConnectedNodes.forEach((nodeId, edgeId) => {
      const wasConnectedBefore = prevConnectedNodesRef.current.has(edgeId);

      if (!wasConnectedBefore) {
        const pattern = new RegExp(
          `\\{\\{\\s*${nodeId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\}\\}`,
          'g'
        );

        if (!pattern.test(updatedText)) {
          if (updatedText.trim() && updatedText.trim() !== '{{input}}') {
            updatedText = `${updatedText} {{${nodeId}}}`;
          } else {
            updatedText = `{{${nodeId}}}`;
          }
          textNeedsUpdate = true;
        }
      }
    });

    if (textNeedsUpdate) {
      isUpdatingFromEdgeRef.current = true;
      setCurrText(updatedText);
    }

    prevConnectedNodesRef.current = currentConnectedNodes;
  }, [edges, nodes, id, currText]);

  // Auto-connect based on variables
  useEffect(() => {
    const regex = /\{\{\s*(\S+)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      const nodeId = match[1].trim();
      if (!matches.includes(nodeId)) {
        matches.push(nodeId);
      }
    }

    setVariables(matches);

    const newErrors = [];
    matches.forEach((nodeId) => {
      const sourceNode = nodes.find((node) => node.id === nodeId);

      if (sourceNode) {
        const existingEdge = edges.find(
          (edge) => edge.target === id && edge.source === sourceNode.id
        );

        if (!existingEdge) {
          let sourceHandle = `${sourceNode.id}-value`;

          const handleMap = {
            llm: 'response',
            text: 'output',
            calculator: 'result',
            transform: 'output',
            api: 'response',
            merge: 'merged',
            conditional: 'true',
          };

          if (handleMap[sourceNode.type]) {
            sourceHandle = `${sourceNode.id}-${handleMap[sourceNode.type]}`;
          }

          onConnect({
            source: sourceNode.id,
            sourceHandle: sourceHandle,
            target: id,
            targetHandle: `${id}-input`,
          });
        }
      } else {
        if (!newErrors.includes(nodeId)) {
          newErrors.push(nodeId);
        }
      }
    });

    setErrors(newErrors);

    // Auto-resize
    const lines = currText.split('\n').length;
    const longestLine = Math.max(
      ...currText.split('\n').map((line) => line.length),
      20
    );

    const newWidth = Math.min(Math.max(250, longestLine * 7 + 40), 500);
    const newHeight = Math.max(120, lines * 20 + 100);

    setDimensions({ width: newWidth, height: newHeight });
  }, [currText, nodes, edges, id, onConnect]);

  const fields = [
    {
      label: 'Text',
      type: 'textarea',
      value: currText,
      onChange: (e) => setCurrText(e.target.value),
      placeholder: 'Enter text with {{nodeId}}',
      rows: Math.max(3, currText.split('\n').length),
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Text"
      fields={fields}
      handles={{ inputs: [{ id: 'input' }], outputs: [{ id: 'output' }] }}
      showId={true}
      style={{
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        width: dimensions.width,
        minHeight: dimensions.height,
      }}
    >
      {variables.length > 0 && (
        <div
          style={{
            fontSize: '10px',
            marginTop: '8px',
            padding: '6px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            color: '#FFF',
          }}
        >
          <strong>Variables:</strong> {variables.join(', ')}
        </div>
      )}
      {errors.length > 0 && (
        <div
          style={{
            fontSize: '10px',
            marginTop: '6px',
            padding: '6px',
            background: 'rgba(255,0,0,0.3)',
            borderRadius: '4px',
            color: '#FFF',
            border: '1px solid rgba(255,0,0,0.5)',
          }}
        >
          <strong>⚠️ Not found:</strong> {errors.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};