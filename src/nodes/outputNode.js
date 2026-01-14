// outputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const fields = [
    {
      label: 'Type',
      type: 'select',
      value: outputType,
      onChange: (e) => setOutputType(e.target.value),
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' }
      ]
    }
  ];

  const handles = {
    inputs: [{ id: 'value' }],
    outputs: []
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      fields={fields}
      handles={handles}
      showId={true}
      style={{
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      }}
    />
  );
};

export default OutputNode;