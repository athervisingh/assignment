import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const config = data?.config || NODE_CONFIG.calculator; 
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
       title={config.label}
        icon={config.icon}    
      fields={fields}
      handles={config.handles}      // ✅ From config
      style={config.style}          // ✅ From config
      description={config.description} // ✅ New prop
      showId={true}
    >
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginTop: '8px', color: '#FFF' }}>
        {symbols[operation]}
      </div>
    </BaseNode>
  );
};