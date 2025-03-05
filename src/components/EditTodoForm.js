import React from 'react';
import { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(value, task.id);
    setValue('');
  };
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        placeholder='Обновить задачу'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='todo-btn'>
        Обновить
      </button>
    </form>
  );
};
