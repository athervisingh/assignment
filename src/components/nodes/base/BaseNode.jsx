import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useNodeManagement } from '../../../hooks/useNodeManagement';

export const BaseNode = ({
  id,
  title,
  fields = [],
  handles = { inputs: [], outputs: [], dynamicInputs: [] },
  children,
  style = {},
  showId = true,
}) => {
  const { handleDeleteNode, handleRenameNode } = useNodeManagement();
  const [editableId, setEditableId] = useState(id);
  const [isEditing, setIsEditing] = useState(false);

  const defaultStyle = {
    width: style.width || 200,
    minHeight: style.height || 80,
    border: '2px solid #4A5568',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: 'white',
    position: 'relative',
    ...style,
  };

  const handleIdBlur = () => {
    setIsEditing(false);
    if (editableId !== id && editableId.trim() !== '') {
      const success = handleRenameNode(id, editableId.trim());
      if (!success) setEditableId(id);
    } else if (editableId.trim() === '') {
      setEditableId(id);
    }
  };

  const renderField = (field) => {
    const inputStyle = {
      padding: '4px 8px',
      borderRadius: '4px',
      border: '1px solid #CBD5E0',
      fontSize: '12px',
      width: '100%',
      boxSizing: 'border-box',
    };

    switch (field.type) {
      case 'text':
        return <input type="text" value={field.value} onChange={field.onChange} placeholder={field.placeholder} style={inputStyle} />;
      case 'select':
        return (
          <select value={field.value} onChange={field.onChange} style={{ ...inputStyle, cursor: 'pointer' }}>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'textarea':
        return <textarea value={field.value} onChange={field.onChange} placeholder={field.placeholder} rows={field.rows || 3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} />;
      case 'number':
        return <input type="number" value={field.value} onChange={field.onChange} min={field.min} max={field.max} step={field.step} placeholder={field.placeholder} style={inputStyle} />;
      default:
        return null;
    }
  };

  return (
    <div style={defaultStyle}>
      <button
        onClick={(e) => { e.stopPropagation(); handleDeleteNode(id); }}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#ef4444',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 10,
        }}
        title="Delete node"
      >
        ✕
      </button>

      {handles.inputs?.map((handle, idx) => (
        <Handle
          key={`input-${handle.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.top || `${((idx + 1) * 100) / (handles.inputs.length + 1)}%`,
            background: '#4299e1',
          }}
        />
      ))}

      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</div>

      {showId && (
        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontSize: '9px', color: '#E2E8F0', marginBottom: '2px', display: 'block', textTransform: 'uppercase' }}>
            Node ID:
          </label>
          <input
            type="text"
            value={editableId}
            onChange={(e) => setEditableId(e.target.value)}
            onBlur={handleIdBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.target.blur();
              if (e.key === 'Escape') { setEditableId(id); e.target.blur(); }
            }}
            onFocus={() => setIsEditing(true)}
            style={{
              fontSize: '11px',
              padding: '6px 8px',
              background: isEditing ? 'rgba(66, 153, 225, 0.2)' : 'rgba(255,255,255,0.15)',
              borderRadius: '4px',
              border: isEditing ? '2px solid #4299e1' : '1px solid rgba(255,255,255,0.3)',
              color: '#FFF',
              width: '100%',
              boxSizing: 'border-box',
              fontFamily: 'monospace',
            }}
            placeholder="Enter unique ID"
          />
        </div>
      )}

      {fields.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
          {fields.map((field, idx) => (
            <label key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontWeight: '500', color: '#E2E8F0' }}>{field.label}:</span>
              {renderField(field)}
            </label>
          ))}
        </div>
      )}

      {children}

      {handles.outputs?.map((handle, idx) => (
        <Handle
          key={`output-${handle.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.top || `${((idx + 1) * 100) / (handles.outputs.length + 1)}%`,
            background: '#f56565',
          }}
        />
      ))}
    </div>
  );
};