import React from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

// import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStoage';
// uuidv4();

export const TodoWrapper = () => {
  const {
    addTodo,
    toggleComplete,
    deleteTodo,
    editTodo,
    editTask,
    todos,
    moveTodo,
  } = useLocalStorage();

  return (
    <div className='TodoWrapper'>
      <h1>Список дел</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            index={index}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            moveTodo={moveTodo}
          />
        )
      )}
    </div>
  );
};
