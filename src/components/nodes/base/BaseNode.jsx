import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useNodeManagement } from '../../../hooks/useNodeManagement';
import './BaseNode.css';

export const BaseNode = ({
  id,
  title,
  icon,              // ✅ New prop
  description,
  fields = [],
  handles = { inputs: [], outputs: [], dynamicInputs: [] },
  children,
  style = {},
  showId = true,
}) => {
  const { handleDeleteNode, handleRenameNode } = useNodeManagement();
  const [editableId, setEditableId] = useState(id);
  const [isEditing, setIsEditing] = useState(false);

  const handleIdBlur = () => {
    setIsEditing(false);
    if (editableId !== id && editableId.trim() !== '') {
      const success = handleRenameNode(id, editableId.trim());
      if (!success) setEditableId(id);
    } else if (editableId.trim() === '') {
      setEditableId(id);
    }
  };

  const cssVars = {
    '--node-width': style.width ? `${style.width}px` : undefined,
    '--node-height': style.height ? `${style.height}px` : undefined,
    '--node-bg': style.background || 'white',
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return <input value={field.value} onChange={field.onChange} placeholder={field.placeholder} />;
      case 'select':
        return (
          <select value={field.value} onChange={field.onChange}>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'textarea':
        return <textarea  ref={field.ref}  value={field.value} onChange={field.onChange} rows={field.rows || 3} placeholder={field.placeholder} />;
      case 'number':
        return <input type="number" value={field.value} onChange={field.onChange} min={field.min} max={field.max} step={field.step} />;
      default:
        return null;
    }
  };

  return (
    <div className="base-node" style={cssVars}>


      {handles.inputs?.map((h, i) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={`${id}-${h.id}`}
          className="input-handle"
          style={{ top: h.top || `${((i + 1) * 100) / (handles.inputs.length + 1)}%` }}
        />
      ))}

      <div className="node-title">
        <div className='title-container'>
          <div className='title'>
            {icon && <img src={icon} alt={title} className="node-icon" />}
            <span>{title}</span>
          </div>

          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteNode(id); }}>✕</button>
        </div>

        <div className="node-description">{description}</div>
      </div>

      <div className='node-data'>
             {showId && (
        <>
          <input
            className={`node-id-input ${isEditing ? 'editing' : ''}`}
            value={editableId}
            onChange={(e) => setEditableId(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={handleIdBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.target.blur();
              if (e.key === 'Escape') { setEditableId(id); e.target.blur(); }
            }}
          />
        </>
      )}

      {fields.length > 0 && (
        <div className="fields-container">
          {fields.map((f, i) => (
            <label key={i} className="field-label">
              <span>{f.label}</span>
              {renderField(f)}
            </label>
          ))}
        </div>
      )}

      {children}
      </div>

      {handles.outputs?.map((h, i) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={`${id}-${h.id}`}
          className="output-handle"
          style={{ top: h.top || `${((i + 1) * 100) / (handles.outputs.length + 1)}%` }}
        />
      ))}
    </div>
  );
};
