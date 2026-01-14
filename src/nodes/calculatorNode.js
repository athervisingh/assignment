// calculatorNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

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
        { value: 'modulo', label: '% Modulo' }
      ]
    }
  ];

  const handles = {
    inputs: [
      { id: 'a', top: '33%' },
      { id: 'b', top: '66%' }
    ],
    outputs: [
      { id: 'result' }
    ]
  };

  const getOperationSymbol = () => {
    const symbols = {
      add: '+',
      subtract: '-',
      multiply: '×',
      divide: '÷',
      power: '^',
      modulo: '%'
    };
    return symbols[operation] || '+';
  };

  return (
    <BaseNode
      showId={true}
      id={id}
      title="Calculator"
      fields={fields}
      handles={handles}
      style={{
        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
      }}
    >
      <div style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '8px',
        color: '#FFF'
      }}>
        {getOperationSymbol()}
      </div>
    </BaseNode>
  );
};

export default CalculatorNode;