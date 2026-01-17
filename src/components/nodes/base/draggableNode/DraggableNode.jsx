import React from 'react';
import './DraggableNode.css';  // ← CSS Import

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    event.target.style.cursor = 'grabbing';
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    
    // Add dragging class for animation
    event.target.classList.add('dragging');
  };

  const onDragEnd = (event) => {
    event.target.style.cursor = 'grab';
    event.target.classList.remove('dragging');
  };

  return (
    <div
      className={`draggable-node ${type}`}  // Base class + type class
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      {icon && <img src={icon} className='icon' />}
      <span>{label}</span>
    </div>
  );
};
