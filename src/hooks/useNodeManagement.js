import { useCallback } from 'react';
import { useStore } from '../store/pipelineStore';
import { NodeHelpers } from '../utils/nodeHelpers';

export const useNodeManagement = () => {
  const deleteNode = useStore((state) => state.deleteNode);
  const renameNodeId = useStore((state) => state.renameNodeId);
  const nodes = useStore((state) => state.nodes);

  const handleDeleteNode = useCallback(
    (nodeId) => {
      deleteNode(nodeId);
    },
    [deleteNode]
  );

  const handleRenameNode = useCallback(
    (oldId, newId) => {
      const validation = NodeHelpers.validateNodeId(newId, nodes, oldId);

      if (!validation.valid) {
        alert(`❌ ${validation.error}`);
        return false;
      }

      return renameNodeId(oldId, validation.id);
    },
    [nodes, renameNodeId]
  );

  return {
    handleDeleteNode,
    handleRenameNode,
  };
};