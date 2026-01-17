import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    });
  },

  renameNodeId: (oldId, newId) => {
    if (!newId || newId.trim() === '') return false;

    const trimmedNewId = newId.trim();
    const idExists = get().nodes.some((node) => node.id === trimmedNewId && node.id !== oldId);
    if (idExists) return false;

    const updatedNodes = get().nodes.map((node) =>
      node.id === oldId ? { ...node, id: trimmedNewId } : node
    );

    const updatedEdges = get().edges.map((edge) => {
      let updatedEdge = { ...edge };
      if (edge.source === oldId) {
        updatedEdge.source = trimmedNewId;
        if (edge.sourceHandle?.startsWith(oldId)) {
          updatedEdge.sourceHandle = edge.sourceHandle.replace(oldId, trimmedNewId);
        }
      }
      if (edge.target === oldId) {
        updatedEdge.target = trimmedNewId;
        if (edge.targetHandle?.startsWith(oldId)) {
          updatedEdge.targetHandle = edge.targetHandle.replace(oldId, trimmedNewId);
        }
      }
      return updatedEdge;
    });

    set({ nodes: updatedNodes, edges: updatedEdges });
    return true;
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },
}));