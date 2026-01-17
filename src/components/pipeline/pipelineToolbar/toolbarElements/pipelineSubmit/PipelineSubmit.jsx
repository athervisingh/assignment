import { useState } from 'react';
import { useStore } from '../../../../../store/pipelineStore';
import { PipelineAPI } from '../../../../../services/pipelineAPI';
import { NodeHelpers } from '../../../../../utils/nodeHelpers';
import './PipelineSubmit.css';

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
      let errorMessage = '❌ Error: Failed to submit pipeline\n\n';
      errorMessage += `Error details: ${error.message}`;
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="workflow-header">
      <div className="workflow-left">
        <img src="/pngs/sidebar.png" alt="sidebar icon" className="sidebar-icon" />
        <span>Projects</span>
        <span>/</span>
        <strong>New Project 1</strong>
        <span>/</span>
        <span>New Workflow 1</span>
      </div>

     

      <div className="workflow-right">
        <button onClick={handleSubmit}
          disabled={isLoading}
          className="run-btn">
          <span style={{ marginRight: '2px' }}>▶</span>  {/* Triangular icon */}
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>

    </div>
  );
};
