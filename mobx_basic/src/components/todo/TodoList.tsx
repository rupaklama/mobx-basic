import { observer } from 'mobx-react-lite';

import TodoStore, { Todo } from '../../stores/TodoStore';

import styles from './TodoList.module.css';

// Creating 'todos' parameter which accepts an arg of type - TodoStore Object
// passing 'TodoStore' as an arg
const TodoList = ({ todos }: { todos: TodoStore }) => {
  const handleToggleTodo = (todo: Todo) => {
    // toggle action from our store
    todos.toggle(todo);
  };

  const handleRemoveTodo = (todo: Todo) => {
    // toggle action from our store
    todos.remove(todo);
  };

  return (
    <ul className={styles['todo-list']}>
      {todos.list.map(todo => (
        <li key={todo.id}>
          <label htmlFor={String(todo.id)} className={todo.isDone ? styles.done : ''}>
            {todo.title}
          </label>

          <button
            onClick={() => handleRemoveTodo(todo)}
            className={[styles.remove, todo.isDone && styles.done].join(' ')}
          >
            remove
          </button>

          <button onClick={() => handleToggleTodo(todo)}>
            <input type='checkbox' id={String(todo.id)} readOnly tabIndex={-1} />
          </button>
        </li>
      ))}
    </ul>
  );
};

// note - Need to Register Component as a Observable to connect to the Mobx Store
// and to get notified when our Piece of State changes in the Store.
// We simply have to add Observable Decorator to our Component.
// Here, we just need to wrap up our Component inside of 'Observer' HOC Function.
export default observer(TodoList);
// The observer function / decorator can be used to turn ReactJS components into 'reactive' components.
// It wraps the component's render function in mobx.
// It is 'auto run' function to make sure that any data that is used during
// the rendering of a component forces a re-rendering upon change.
