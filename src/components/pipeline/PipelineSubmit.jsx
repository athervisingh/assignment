import React, { useState } from 'react';
import { useStore } from '../../store/pipelineStore';
import { PipelineAPI } from '../../services/pipelineAPI';
import { NodeHelpers } from '../../utils/nodeHelpers';
import { Button } from '../common/Button';

export const PipelineSubmit = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert('⚠️ Pipeline is empty!\n\nPlease add at least one node before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      const pipelineData = NodeHelpers.formatPipelineData(nodes, edges);
      const result = await PipelineAPI.parsePipeline(pipelineData);

      if (result.success) {
        const { num_nodes, num_edges, is_dag } = result.data;

        const dagStatus = is_dag
          ? '✅ Valid DAG (No Cycles)'
          : '❌ Not a DAG (Contains Cycles)';

        const dagExplanation = is_dag
          ? '✓ Your pipeline is valid and ready to execute!'
          : '⚠ Warning: Your pipeline contains cycles!\nPlease fix the connections.';

        const message = `
╔═══════════════════════════════════════╗
║     PIPELINE ANALYSIS RESULTS         ║
╚═══════════════════════════════════════╝

📊 Number of Nodes: ${num_nodes}
🔗 Number of Edges: ${num_edges}
${dagStatus}

${dagExplanation}
        `;

        alert(message);
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Pipeline submission error:', error);

      let errorMessage = '❌ Error: Failed to submit pipeline\n\n';

      if (error.message.includes('fetch')) {
        errorMessage += '🔌 Backend Connection Error\n\n';
        errorMessage += 'Make sure the backend server is running:\n';
        errorMessage += '1. Open terminal\n';
        errorMessage += '2. Navigate to backend folder\n';
        errorMessage += '3. Run: uvicorn main:app --reload\n';
        errorMessage += '4. Backend should be at: http://127.0.0.1:8000\n';
      } else {
        errorMessage += `Error details: ${error.message}`;
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px 20px',
        background:
          'linear-gradient(180deg, rgba(247,250,252,0.95) 0%, rgba(237,242,247,0.98) 100%)',
        borderTop: '2px solid #cbd5e0',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
      }}
    >
      <Button onClick={handleSubmit} loading={isLoading}>
        🚀 Submit Pipeline
      </Button>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};