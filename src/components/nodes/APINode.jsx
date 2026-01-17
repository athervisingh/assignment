import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');
  const config = data?.config || NODE_CONFIG.api; 

  const fields = [
    {
      label: 'Method',
      type: 'select',
      value: method,
      onChange: (e) => setMethod(e.target.value),
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
        { value: 'PATCH', label: 'PATCH' },
      ],
    },
    {
      label: 'Endpoint',
      type: 'text',
      value: endpoint,
      onChange: (e) => setEndpoint(e.target.value),
      placeholder: 'https://api.example.com/data',
    },
  ];

  return (
    <BaseNode
      id={id}
      title={config.label}
      fields={fields}
      handles={config.handles}      // ✅ From config
      style={config.style}          // ✅ From config
      description={config.description} // ✅ New prop
      showId={true}
      icon={config.icon}    
    >
    </BaseNode>
  );
};