// conditionalNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');

  const fields = [
    {
      label: 'Condition',
      type: 'select',
      value: condition,
      onChange: (e) => setCondition(e.target.value),
      options: [
        { value: 'equals', label: '== Equals' },
        { value: 'notEquals', label: '!= Not Equals' },
        { value: 'greaterThan', label: '> Greater Than' },
        { value: 'lessThan', label: '< Less Than' },
        { value: 'greaterOrEqual', label: '>= Greater or Equal' },
        { value: 'lessOrEqual', label: '<= Less or Equal' }
      ]
    }
  ];

  const handles = {
    inputs: [
      { id: 'valueA', top: '25%' },
      { id: 'valueB', top: '50%' }
    ],
    outputs: [
      { id: 'true', top: '33%' },
      { id: 'false', top: '66%' }
    ]
  };

  return (
    <BaseNode
      showId={true}
      id={id}
      title="Conditional"
      fields={fields}
      handles={handles}
      style={{
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        height: 120
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '8px',
        fontSize: '11px',
        color: '#FFF'
      }}>
        <span>✓ True</span>
        <span>✗ False</span>
      </div>
    </BaseNode>
  );
};

export default ConditionalNode;