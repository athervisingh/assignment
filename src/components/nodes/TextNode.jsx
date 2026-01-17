import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './base/BaseNode';
import { useStore } from '../../store/pipelineStore';
import { NODE_CONFIG } from '../../config/nodeConfig';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [errors, setErrors] = useState([]);
  
  const config = data?.config || NODE_CONFIG.text; 
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onConnect = useStore((state) => state.onConnect);

  const prevConnectedNodesRef = useRef(new Map());
  const isUpdatingFromEdgeRef = useRef(false);


  // ✅ NEW: Auto-resize when currText changes (from edges!)
useEffect(() => {
  if (textareaRef.current) {
    const textarea = textareaRef.current;
    
    // Reset height
    textarea.style.height = '32px';
    
    // Calculate new height (max 112px = 5 lines)
    const newHeight = Math.min(textarea.scrollHeight, 112);
    textarea.style.height = `${newHeight}px`;
  }
}, [currText]); // ✅ Runs whenever currText changes!
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
    // ✅ FIXED REGEX: Matches {{anything}} properly
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      const nodeId = match[1].trim(); // Extract and trim variable name
      if (nodeId && !matches.includes(nodeId)) {
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
  }, [currText, nodes, edges, id, onConnect]);

  const textareaRef = useRef(null);

  // Auto-resize textarea
  const handleTextChange = (e) => {
    const textarea = e.target;
    setCurrText(textarea.value);
    
    // Reset height to recalculate
    textarea.style.height = '32px';
    
    // Calculate new height (max 112px = 5 lines)
    const newHeight = Math.min(textarea.scrollHeight, 112);
    textarea.style.height = `${newHeight}px`;
  };

  const fields = [
    {
      label: 'Text',
      type: 'textarea',
      value: currText,
      onChange: handleTextChange,
      placeholder: 'Type {{...}} to utilize variables',
      rows: 1,
      ref: textareaRef,
    },
  ];

  return (
    <BaseNode
      id={id}
      title={config.label}
      fields={fields}
      handles={config.handles}
      style={config.style}
      description={config.description}
      showId={true}
      icon={config.icon}
    >
      {variables.length > 0 && (
        <div
          style={{
            fontSize: '10px',
            marginTop: '8px',
            padding: '6px',
            background: 'rgba(59, 130, 246, 0.2)',
            borderRadius: '4px',
            color: '#1e40af',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}
        >
          <strong>🔗 Variables:</strong> {variables.join(', ')}
        </div>
      )}
      {errors.length > 0 && (
        <div
          style={{
            fontSize: '10px',
            marginTop: '6px',
            padding: '6px',
            background: 'rgba(239, 68, 68, 0.2)',
            borderRadius: '4px',
            color: '#dc2626',
            border: '1px solid rgba(239, 68, 68, 0.4)',
          }}
        >
          <strong>⚠️ Not found:</strong> {errors.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};