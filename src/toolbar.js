// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: '2px solid #4A5568'
        }}>
            <h2 style={{ 
              color: 'white', 
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🔧 Node Toolkit
            </h2>
            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '12px',
              justifyContent: 'center'
            }}>
                {/* Original Nodes */}
                <DraggableNode type='customInput' label='📥 Input' />
                <DraggableNode type='llm' label='🤖 LLM' />
                <DraggableNode type='customOutput' label='📤 Output' />
                <DraggableNode type='text' label='📝 Text' />
                
                {/* New Nodes */}
                <DraggableNode type='calculator' label='🧮 Calculator' />
                <DraggableNode type='number' label='🔢 Number' />
                <DraggableNode type='conditional' label='🔀 Conditional' />
                <DraggableNode type='transform' label='🔄 Transform' />
                <DraggableNode type='api' label='🌐 API' />
                <DraggableNode type='merge' label='🔗 Merge' />
            </div>
        </div>
    );
};