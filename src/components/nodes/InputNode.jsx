import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';
export const InputNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const config = data?.config || NODE_CONFIG.customInput; 
  const fields = [
    {
      label: 'Type',
      type: 'select',
      value: inputType,
      onChange: (e) => setInputType(e.target.value),
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
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
    />
  );
};