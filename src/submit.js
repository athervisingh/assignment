// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { PipelineAPI, formatPipelineData } from './services/api';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (nodes.length === 0) {
      alert('⚠️ Pipeline is empty!\n\nPlease add at least one node before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      // Format pipeline data
      const pipelineData = formatPipelineData(nodes, edges);

      // Call API
      const result = await PipelineAPI.parsePipeline(pipelineData);

      if (result.success) {
        const { num_nodes, num_edges, is_dag } = result.data;

        // Display user-friendly alert
        const dagStatus = is_dag 
          ? '✅ Valid DAG (No Cycles)' 
          : '❌ Not a DAG (Contains Cycles)';
        
        const dagExplanation = is_dag
          ? '✓ Your pipeline is valid and ready to execute!\nAll nodes are connected in a proper flow without circular dependencies.'
          : '⚠ Warning: Your pipeline contains cycles!\nPlease fix the connections to ensure a proper flow.\nCircular dependencies can cause infinite loops.';

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
        // API returned error
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
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px 20px',
      background: 'linear-gradient(180deg, rgba(247,250,252,0.95) 0%, rgba(237,242,247,0.98) 100%)',
      borderTop: '2px solid #cbd5e0',
      boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000
    }}>
      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          padding: '14px 40px',
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'white',
          background: isLoading 
            ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          borderRadius: '10px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: isLoading ? 0.7 : 1
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        {isLoading ? (
          <>
            <span style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid #ffffff',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}></span>
            Processing...
          </>
        ) : (
          <>
            🚀 Submit Pipeline
          </>
        )}
      </button>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};