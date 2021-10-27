import { action, makeObservable, observable } from 'mobx';

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

// Todo Store
class TodoStore {
  // state
  list: Todo[] = [];

  // we want to connect to mobx now & make it re-active
  constructor() {
    // func by mobx
    // first param is Object - instance of a TodoStore
    // Second param is Map of Annotation to link Properties & Methods of our Class
    // with respective mobx classification to UPDATE our State Object - An Action
    makeObservable(this, {
      // Creating Observable - trackable field property that stores the State
      // 'observable' means piece of state which can be trackable & subscribe
      list: observable,
      // actions to modify the state
      add: action,
      toggle: action,
      remove: action,
    });
  }

  // note - now whenever we create an Object from our Class,
  // it will automatically setup as a Mobx Store

  // methods to update our state
  add(title: string) {
    // validating input
    if (title.length < 2) {
      return;
    }

    this.list.push({
      id: Date.now(),
      title,
      isDone: false,
    });
  }

  // note - Passing whole todo object & since objects are passed by 'reference'
  // we can simply manipulate it directly
  toggle(todo: Todo) {
    todo.isDone = !todo.isDone;
  }

  remove(todo: Todo) {
    this.list = this.list.filter(item => item.id !== todo.id);
  }
}

export default TodoStore;
