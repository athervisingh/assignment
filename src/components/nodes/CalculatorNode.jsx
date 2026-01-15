import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const symbols = { add: '+', subtract: '-', multiply: '×', divide: '÷', power: '^', modulo: '%' };

  const fields = [
    {
      label: 'Operation',
      type: 'select',
      value: operation,
      onChange: (e) => setOperation(e.target.value),
      options: [
        { value: 'add', label: '➕ Add' },
        { value: 'subtract', label: '➖ Subtract' },
        { value: 'multiply', label: '✖️ Multiply' },
        { value: 'divide', label: '➗ Divide' },
        { value: 'power', label: '^ Power' },
        { value: 'modulo', label: '% Modulo' },
      ],
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Calculator"
      fields={fields}
      handles={{
        inputs: [{ id: 'a', top: '33%' }, { id: 'b', top: '66%' }],
        outputs: [{ id: 'result' }],
      }}
      showId={true}
      style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
    >
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginTop: '8px', color: '#FFF' }}>
        {symbols[operation]}
      </div>
    </BaseNode>
  );
};