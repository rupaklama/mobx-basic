import React from 'react';
import './index.css';

import TodoStore from './stores/TodoStore';
import TodoInput from './components/todo/TodoInput';
import TodoList from './components/todo/TodoList';

// creating new instance of our TodoStore
// note - since we don't want to re-render Store Instance when App Component renders,
// therefore creating outside of App Component.
const todos = new TodoStore();

const App = () => {
  return (
    <div className='app'>
      <h1>Todo App</h1>
      <TodoList todos={todos} />
      <TodoInput todos={todos} />
    </div>
  );
};

export default App;
