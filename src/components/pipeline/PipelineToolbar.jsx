import React from 'react';
import { DraggableNode } from '../nodes/base/DraggableNode';
import { NODE_CONFIG } from '../../config/nodeConfig';

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: '2px solid #4A5568',
      }}
    >
      <h2
        style={{
          color: 'white',
          marginBottom: '15px',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        🔧 Node Toolkit
      </h2>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
        }}
      >
        {Object.entries(NODE_CONFIG).map(([type, config]) => (
          <DraggableNode key={type} type={type} label={config.label} />
        ))}
      </div>
    </div>
  );
};