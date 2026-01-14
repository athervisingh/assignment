// numberNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const NumberNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || 0);
  const [min, setMin] = useState(data?.min || 0);
  const [max, setMax] = useState(data?.max || 100);

  const fields = [
    {
      label: 'Value',
      type: 'number',
      value: value,
      onChange: (e) => setValue(e.target.value),
      min: min,
      max: max,
      step: 1
    },
    {
      label: 'Min',
      type: 'number',
      value: min,
      onChange: (e) => setMin(e.target.value)
    },
    {
      label: 'Max',
      type: 'number',
      value: max,
      onChange: (e) => setMax(e.target.value)
    }
  ];

  const handles = {
    inputs: [],
    outputs: [{ id: 'value' }]
  };

  return (
    <BaseNode
      showId={true}
      id={id}
      title="Number"
      fields={fields}
      handles={handles}
      style={{
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        height: 160
      }}
    />
  );
};

export default NumberNode;