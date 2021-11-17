import { createContext, useContext } from 'react';
import TodoStore from './TodoStore';

// todos store
const store = {
  // todos: new TodoStore(),
  // note - Factory Functions are functions that create other Objects without the New keyword.
  todos: TodoStore,
};

// global state
export const StoreContext = createContext(store);

// custom hook to avoid keep importing useContext & StoreContext in all our components to access our store
export const useStore = () => {
  // return useContext(StoreContext) as typeof store;
  // same as above with different annotation
  return useContext<typeof store>(StoreContext);
};

// to pass into Provider in index.tsx
export default store;
