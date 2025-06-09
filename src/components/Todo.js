import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({
  task,
  toggleComplete,
  deleteTodo,
  editTodo,
  index,
  moveTodo,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  function dragStartHandler(e, index) {
    e.dataTransfer.setData('text/plain', index);
    setIsDragging(true);
    e.target.style.opacity = '0.4';
  }

  function dragEndHandler(e) {
    e.target.style.opacity = '1';
    setIsDragging(false);
  }

  function dragOverHandler(e) {
    e.preventDefault();
    if (isDragging) {
      e.target.style.background = '#42506b';
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.background = '#6495ed';
  }

  function dropHandler(e, dropIndex) {
    e.preventDefault();
    e.target.style.background = '#6495ed';

    const draggedIndex = e.dataTransfer.getData('text/plain');
    if (draggedIndex && draggedIndex !== dropIndex) {
      moveTodo(Number(draggedIndex), Number(dropIndex));
    }
  }

  return (
    <div
      className='Todo'
      style={{ cursor: 'grab', background: '#6495ed' }}
      draggable
      onDragStart={(e) => dragStartHandler(e, index)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDrop={(e) => dropHandler(e, index)}
    >
      <p
        onClick={() => toggleComplete(task.id)}
        className={task.completed ? 'completed' : ''}
      >
        {task.task}
      </p>
      <div style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
