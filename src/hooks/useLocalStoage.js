import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useLocalStorage() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedList = localStorage.getItem('List');
      return savedList ? JSON.parse(savedList) : [];
    } catch (e) {
      console.error('Ошибка загрузки из localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('List', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ...todos,
    ]);
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const moveTodo = (dragIndex, hoverIndex) => {
    console.log('moving');
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const draggedItem = newTodos[dragIndex];

      newTodos.splice(dragIndex, 1);
      newTodos.splice(hoverIndex, 0, draggedItem);

      return newTodos;
    });
  };

  return {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    editTask,
    moveTodo,
  };
}
