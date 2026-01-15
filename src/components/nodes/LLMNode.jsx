import React from 'react';
import { BaseNode } from './base/BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={{
        inputs: [{ id: 'system', top: '33%' }, { id: 'prompt', top: '66%' }],
        outputs: [{ id: 'response' }],
      }}
      showId={true}
      style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', height: 100 }}
    >
      <div style={{ fontSize: '11px', textAlign: 'center', marginTop: '8px', color: '#FFF', opacity: 0.9 }}>
        This is an LLM node
      </div>
    </BaseNode>
  );
};