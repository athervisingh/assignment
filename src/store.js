// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeId),
            edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
        });
    },
    // Rename node ID globally - updates everywhere
    renameNodeId: (oldId, newId) => {
        // Validate new ID
        if (!newId || newId.trim() === '') {
            return false;
        }

        const trimmedNewId = newId.trim();

        // Check if new ID already exists (and it's not the same node)
        const idExists = get().nodes.some(node => node.id === trimmedNewId && node.id !== oldId);
        if (idExists) {
            alert(`❌ ID "${trimmedNewId}" already exists! Please choose a different ID.`);
            return false;
        }

        // Update node ID
        const updatedNodes = get().nodes.map(node => {
            if (node.id === oldId) {
                return { ...node, id: trimmedNewId };
            }
            return node;
        });

        // Update all edges that reference this node
        const updatedEdges = get().edges.map(edge => {
            let updatedEdge = { ...edge };
            
            // Update source
            if (edge.source === oldId) {
                updatedEdge.source = trimmedNewId;
                // Update source handle
                if (edge.sourceHandle && edge.sourceHandle.startsWith(oldId)) {
                    updatedEdge.sourceHandle = edge.sourceHandle.replace(oldId, trimmedNewId);
                }
            }
            
            // Update target
            if (edge.target === oldId) {
                updatedEdge.target = trimmedNewId;
                // Update target handle
                if (edge.targetHandle && edge.targetHandle.startsWith(oldId)) {
                    updatedEdge.targetHandle = edge.targetHandle.replace(oldId, trimmedNewId);
                }
            }
            
            return updatedEdge;
        });

        set({
            nodes: updatedNodes,
            edges: updatedEdges
        });

        return true;
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
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