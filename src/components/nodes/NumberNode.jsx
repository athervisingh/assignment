import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';
export const NumberNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || 0);
  const [min, setMin] = useState(data?.min || 0);
  const [max, setMax] = useState(data?.max || 100);
  const config = data?.config || NODE_CONFIG.number; 

  const fields = [
    { label: 'Value', type: 'number', value, onChange: (e) => setValue(e.target.value), min, max, step: 1 },
    { label: 'Min', type: 'number', value: min, onChange: (e) => setMin(e.target.value) },
    { label: 'Max', type: 'number', value: max, onChange: (e) => setMax(e.target.value) },
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