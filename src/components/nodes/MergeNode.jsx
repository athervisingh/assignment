import React, { useState } from 'react';
import { BaseNode } from './base/BaseNode';
import { NODE_CONFIG } from '../../config/nodeConfig';
export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');
    const config = data?.config || NODE_CONFIG.merge; 

  const fields = [
    {
      label: 'Merge Type',
      type: 'select',
      value: mergeType,
      onChange: (e) => setMergeType(e.target.value),
      options: [
        { value: 'concat', label: 'Concatenate' },
        { value: 'array', label: 'To Array' },
        { value: 'object', label: 'To Object' },
      ],
    },
    {
      label: 'Separator',
      type: 'text',
      value: separator,
      onChange: (e) => setSeparator(e.target.value),
      placeholder: ', ',
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