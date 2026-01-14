// apiNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');

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
        { value: 'PATCH', label: 'PATCH' }
      ]
    },
    {
      label: 'Endpoint',
      type: 'text',
      value: endpoint,
      onChange: (e) => setEndpoint(e.target.value),
      placeholder: 'https://api.example.com/data'
    }
  ];

  const handles = {
    inputs: [
      { id: 'body', top: '40%' },
      { id: 'headers', top: '70%' }
    ],
    outputs: [
      { id: 'response' }
    ]
  };

  return (
    <BaseNode
      showId={true}
      id={id}
      title="API Call"
      fields={fields}
      handles={handles}
      style={{
        background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        height: 140
      }}
    >
      <div style={{
        textAlign: 'center',
        fontSize: '18px',
        marginTop: '6px'
      }}>
        🌐
      </div>
    </BaseNode>
  );
};

export default APINode;