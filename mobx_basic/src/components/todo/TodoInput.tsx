import { FormEvent } from 'react';

// context store
import { useStore } from '../../stores';

// import TodoStore from '../../stores/TodoStore';

import styles from './TodoInput.module.css';

// Creating 'todos' parameter which accepts an arg of type - TodoStore Object
// passing 'TodoStore' as an arg
// const TodoInput = ({ todos }: { todos: TodoStore }) => {
const TodoInput = () => {
  // accessing todos state in our store with Context api
  const { todos } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const value = String(formData.get('todo-input' || ''));
    // action
    todos.add(value);

    // reset form
    formElement.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles['todo-input-group']}>
      <input name='todo-input' placeholder='Add todo...' />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default TodoInput;
