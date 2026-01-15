import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  const fields = [
    {
      label: 'Transform',
      type: 'select',
      value: transformType,
      onChange: (e) => setTransformType(e.target.value),
      options: [
        { value: 'uppercase', label: 'UPPERCASE' },
        { value: 'lowercase', label: 'lowercase' },
        { value: 'capitalize', label: 'Capitalize' },
        { value: 'reverse', label: 'Reverse' },
        { value: 'trim', label: 'Trim Spaces' },
        { value: 'length', label: 'Get Length' },
      ],
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Transform"
      fields={fields}
      handles={{ inputs: [{ id: 'input' }], outputs: [{ id: 'output' }] }}
      showId={true}
      style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}
    >
      <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '8px' }}>🔄</div>
    </BaseNode>
  );
};