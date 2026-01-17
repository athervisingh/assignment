import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';
export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const config = data?.config || NODE_CONFIG.conditional; 
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
        { value: 'lessOrEqual', label: '<= Less or Equal' },
      ],
    },
  ];

  return (
    <BaseNode
      id={id}
       title={config.label}
      fields={fields}
      handles={config.handles}      // ✅ From config
      style={config.style}          // ✅ From config
      description={config.description} // ✅ New prop
      showId={true}
       icon={config.icon}    
    >
    </BaseNode>
  );
};