import { useState } from 'react';
import './index.css';
import styles from './App.module.css';

// import TodoStore from './stores/TodoStore';
import TodoInput from './components/todo/TodoInput';
import TodoList from './components/todo/TodoList';
import { useStore } from './stores';
import { toJS, trace } from 'mobx';

// creating new instance of our TodoStore
// note - since we don't want to re-render Store Instance when App Component renders,
// therefore creating outside of App Component.
// const todos = new TodoStore();

const App = () => {
  const [todosVisible, setTodosVisible] = useState(true);

  const { todos } = useStore();

  // Logging observables
  // debugging tips to remove proxy to get values we want
  // 1. JSON
  console.log(JSON.parse(JSON.stringify(todos.list)));
  // 2. mobx built in method - toJS
  console.log(toJS(todos.list));

  // using mobx Trace function to debug - does not work inside Action though
  // trace();

  const handleClick = () => setTodosVisible(!todosVisible);

  return (
    <div className='app'>
      {/* Instead of passing our Stores as props into all our components, using Context api */}
      {/* <TodoList todos={todos} />
      <TodoInput todos={todos} /> */}

      <div className={styles['todo-list-wrapper']}>
        <h2 onClick={handleClick}>
          <span>{todosVisible ? '-' : '+'}</span>
          My Todos (unfinished {todos.unfinishedTodos.length}) ;
        </h2>

        {todosVisible && <TodoList />}
      </div>

      <TodoInput />
    </div>
  );
};

export default App;
