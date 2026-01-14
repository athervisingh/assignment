// baseNode.js
import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ 
  id, 
  title, 
  fields = [], 
  handles = { inputs: [], outputs: [], dynamicInputs: [] },
  children,
  style = {},
  showId = false
}) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const renameNodeId = useStore((state) => state.renameNodeId);
  
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
    ...style
  };

  const deleteButtonStyle = {
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    transition: 'all 0.2s',
    zIndex: 10
  };

  const titleStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#FFF'
  };

  const idFieldStyle = {
    fontSize: '11px',
    marginBottom: '8px',
    padding: '6px 8px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '4px',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#FFF',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'monospace',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'text'
  };

  const fieldContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '12px'
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const inputStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #CBD5E0',
    fontSize: '12px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    fontFamily: 'monospace'
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const handleIdChange = (e) => {
    setEditableId(e.target.value);
  };

  const handleIdBlur = () => {
    setIsEditing(false);
    if (editableId !== id && editableId.trim() !== '') {
      const success = renameNodeId(id, editableId.trim());
      if (!success) {
        // Reset to original ID if rename failed
        setEditableId(id);
      }
    } else if (editableId.trim() === '') {
      // Reset if empty
      setEditableId(id);
    }
  };

  const handleIdKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    } else if (e.key === 'Escape') {
      setEditableId(id);
      e.target.blur();
    }
  };

  const handleIdFocus = () => {
    setIsEditing(true);
  };

  // Render field based on type
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            style={inputStyle}
          />
        );
      
      case 'select':
        return (
          <select 
            value={field.value} 
            onChange={field.onChange}
            style={selectStyle}
          >
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            style={textareaStyle}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={field.value}
            onChange={field.onChange}
            min={field.min}
            max={field.max}
            step={field.step}
            placeholder={field.placeholder}
            style={inputStyle}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={defaultStyle}>
      {/* Delete Button */}
      <button 
        onClick={handleDelete}
        style={deleteButtonStyle}
        onMouseEnter={(e) => {
          e.target.style.background = '#dc2626';
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = '#ef4444';
          e.target.style.transform = 'scale(1)';
        }}
        title="Delete node"
      >
        ✕
      </button>

      {/* Input Handles (Left Side) */}
      {handles.inputs?.map((handle, idx) => (
        <Handle
          key={`input-${handle.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.top || `${((idx + 1) * 100) / (handles.inputs.length + 1)}%`,
            background: '#4299e1'
          }}
        />
      ))}

      {/* Dynamic Input Handles (for variables in Text node) */}
      {handles.dynamicInputs?.map((handle, idx) => (
        <Handle
          key={`dynamic-${handle.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.top || `${((idx + 1 + (handles.inputs?.length || 0)) * 100) / 
              ((handles.inputs?.length || 0) + handles.dynamicInputs.length + 1)}%`,
            background: '#48bb78'
          }}
        />
      ))}

      {/* Title */}
      <div style={titleStyle}>{title}</div>

      {/* Editable Node ID Field */}
      {showId && (
        <div style={{ marginBottom: '8px' }}>
          <label style={{ 
            fontSize: '9px', 
            color: '#E2E8F0', 
            marginBottom: '2px', 
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Node ID (Editable):
          </label>
          <input
            type="text"
            value={editableId}
            onChange={handleIdChange}
            onBlur={handleIdBlur}
            onKeyDown={handleIdKeyDown}
            onFocus={handleIdFocus}
            style={{
              ...idFieldStyle,
              border: isEditing ? '2px solid #4299e1' : '1px solid rgba(255,255,255,0.3)',
              background: isEditing ? 'rgba(66, 153, 225, 0.2)' : 'rgba(255,255,255,0.15)',
              boxShadow: isEditing ? '0 0 0 3px rgba(66, 153, 225, 0.1)' : 'none'
            }}
            placeholder="Enter unique ID"
            title="Click to edit. Press Enter to save, Esc to cancel."
          />
        </div>
      )}

      {/* Fields */}
      {fields.length > 0 && (
        <div style={fieldContainerStyle}>
          {fields.map((field, idx) => (
            <label key={idx} style={labelStyle}>
              <span style={{ fontWeight: '500', color: '#E2E8F0' }}>
                {field.label}:
              </span>
              {renderField(field)}
            </label>
          ))}
        </div>
      )}

      {/* Custom Children */}
      {children}

      {/* Output Handles (Right Side) */}
      {handles.outputs?.map((handle, idx) => (
        <Handle
          key={`output-${handle.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          style={{
            top: handle.top || `${((idx + 1) * 100) / (handles.outputs.length + 1)}%`,
            background: '#f56565'
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;