import React from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';
export const LLMNode = ({ id, data }) => {
    const config = data?.config || NODE_CONFIG.llm; 
  return (
    <BaseNode
      id={id}
       title={config.label}
      // fields={fields}
      handles={config.handles}      // ✅ From config
      style={config.style}          // ✅ From config
      description={config.description} // ✅ New prop
      showId={true}
        icon={config.icon}
    >
      <div style={{ fontSize: '11px', textAlign: 'center', marginTop: '8px', color: '#000000', opacity: 0.9 }}>
        This is an LLM node
      </div>
    </BaseNode>
  );
};