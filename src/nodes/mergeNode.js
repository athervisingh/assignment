// mergeNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');

  const fields = [
    {
      label: 'Merge Type',
      type: 'select',
      value: mergeType,
      onChange: (e) => setMergeType(e.target.value),
      options: [
        { value: 'concat', label: 'Concatenate' },
        { value: 'array', label: 'To Array' },
        { value: 'object', label: 'To Object' }
      ]
    },
    {
      label: 'Separator',
      type: 'text',
      value: separator,
      onChange: (e) => setSeparator(e.target.value),
      placeholder: ', '
    }
  ];

  const handles = {
    inputs: [
      { id: 'input1', top: '25%' },
      { id: 'input2', top: '50%' },
      { id: 'input3', top: '75%' }
    ],
    outputs: [
      { id: 'merged' }
    ]
  };

  return (
    <BaseNode
      showId={true}
      id={id}
      title="Merge"
      fields={fields}
      handles={handles}
      style={{
        background: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
        height: 140
      }}
    >
      <div style={{
        textAlign: 'center',
        fontSize: '20px',
        marginTop: '6px'
      }}>
        🔗
      </div>
    </BaseNode>
  );
};

export default MergeNode;