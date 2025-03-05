import React from 'react';
import { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    addTodo(value);
    setValue('');
  };
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        placeholder='Какая задача на сегодня?'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='todo-btn'>
        Добавить задачу
      </button>
    </form>
  );
};
