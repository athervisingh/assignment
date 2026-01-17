import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';
export const OutputNode = ({ id, data }) => {
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const config = data?.config || NODE_CONFIG.output; 
  const fields = [
    {
      label: 'Type',
      type: 'select',
      value: outputType,
      onChange: (e) => setOutputType(e.target.value),
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
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