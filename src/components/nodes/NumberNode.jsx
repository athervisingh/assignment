import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';

export const NumberNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || 0);
  const [min, setMin] = useState(data?.min || 0);
  const [max, setMax] = useState(data?.max || 100);

  const fields = [
    { label: 'Value', type: 'number', value, onChange: (e) => setValue(e.target.value), min, max, step: 1 },
    { label: 'Min', type: 'number', value: min, onChange: (e) => setMin(e.target.value) },
    { label: 'Max', type: 'number', value: max, onChange: (e) => setMax(e.target.value) },
  ];

  return (
    <BaseNode
      id={id}
      title="Number"
      fields={fields}
      handles={{ inputs: [], outputs: [{ id: 'value' }] }}
      showId={true}
      style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', height: 160 }}
    />
  );
};