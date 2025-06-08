import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useLocalStorage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedList = localStorage.getItem('List');
    if (savedList) {
      setTodos(JSON.parse(savedList));
    }
  }, []);

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
    localStorage.setItem('List', JSON.stringify(todos));
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

  return {
    todos,
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    editTask,
  };
}
