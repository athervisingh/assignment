import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';
export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const config = data?.config || NODE_CONFIG.transform; 
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