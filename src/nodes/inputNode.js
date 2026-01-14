// inputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const fields = [
    {
      label: 'Type',
      type: 'select',
      value: inputType,
      onChange: (e) => setInputType(e.target.value),
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ];

  const handles = {
    inputs: [],
    outputs: [{ id: 'value' }]
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      fields={fields}
      handles={handles}
      showId={true}
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    />
  );
};

export default InputNode;