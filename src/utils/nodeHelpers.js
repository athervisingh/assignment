import { NODE_CONFIG } from '../config/nodeConfig';

export const NodeHelpers = {
  getNodeConfig: (nodeType) => NODE_CONFIG[nodeType] || null,

  getSourceHandle: (nodeType, nodeId) => {
    const handles = {
      llm: 'response',
      text: 'output',
      calculator: 'result',
      number: 'value',
      transform: 'output',
      api: 'response',
      merge: 'merged',
      conditional: 'true',
      customInput: 'value',
      customOutput: 'value',
    };
    return `${nodeId}-${handles[nodeType] || 'value'}`;
  },

  validateNodeId: (newId, existingNodes, currentId = null) => {
    if (!newId || newId.trim() === '') {
      return { valid: false, error: 'ID cannot be empty' };
    }

    const trimmedId = newId.trim();

    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedId)) {
      return {
        valid: false,
        error: 'ID can only contain letters, numbers, hyphens, and underscores',
      };
    }

    const idExists = existingNodes.some(
      (node) => node.id === trimmedId && node.id !== currentId
    );

    if (idExists) {
      return { valid: false, error: `ID "${trimmedId}" already exists` };
    }

    return { valid: true, id: trimmedId };
  },

  formatPipelineData: (nodes, edges) => ({
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: node.data || {},
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle || null,
      targetHandle: edge.targetHandle || null,
    })),
  }),
};