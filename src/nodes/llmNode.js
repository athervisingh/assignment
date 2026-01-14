// llmNode.js
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  
  const handles = {
    inputs: [
      { id: 'system', top: '33%' },
      { id: 'prompt', top: '66%' }
    ],
    outputs: [
      { id: 'response' }
    ]
  };

  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={handles}
      showId={true}
      style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        height: 100
      }}
    >
      <div style={{ 
        fontSize: '11px', 
        textAlign: 'center', 
        marginTop: '8px',
        color: '#FFF',
        opacity: 0.9
      }}>
        This is an LLM node
      </div>
    </BaseNode>
  );
};

export default LLMNode;