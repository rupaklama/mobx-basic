import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { Todo } from '../../stores/TodoStore';

import styles from './TodoList.module.css';

const TodoList = () => {
  // todos store in Context
  const { todos } = useStore();

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
      {todos.list.map((todo: Todo) => (
        <li key={todo.id}>
          <label htmlFor={String(todo.id)} className={todo.isDone ? styles.done : ''}>
            {todo.title}
          </label>

          <button
            onClick={() => handleRemoveTodo(todo)}
            className={[styles.remove, todo.isDone && styles.done].join(' ')}
            // className={todo.isDone ? [styles.done, styles.remove].join(' ') : ''}
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

// note - Need to Register Component as a Observer to connect to the Mobx Store
// and to get notified when our Piece of State changes in the Store.
// We simply have to add Observer Decorator to our Component.
// Here, we just need to wrap up our Component inside of 'Observer' HOC Function.
export default observer(TodoList);
// The observer function / decorator can be used to turn ReactJS components into 'reactive' components.
// It is 'mobx auto run' function which re-renders whenever there are changes in our State.
