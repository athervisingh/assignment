import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';

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
        { value: 'Image', label: 'Image' },
      ],
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      fields={fields}
      handles={{ inputs: [{ id: 'value' }], outputs: [] }}
      showId={true}
      style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}
    />
  );
};