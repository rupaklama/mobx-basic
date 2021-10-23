import { ChangeEvent, FormEvent, useState } from 'react';

import TodoStore from '../../stores/TodoStore';

import styles from './TodoInput.module.css';

// Creating 'todos' parameter which accepts an arg of type - TodoStore Object
// passing 'TodoStore' as an arg
const TodoInput = ({ todos }: { todos: TodoStore }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // add action from our Store
    todos.add(newTodo);

    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles['todo-input-group']}>
      <input value={newTodo} onChange={handleInputChange} />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default TodoInput;
