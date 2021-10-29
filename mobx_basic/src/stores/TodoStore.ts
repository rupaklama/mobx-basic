// import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { makeAutoObservable, trace } from 'mobx';

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

// NOTE - ANOTHER THING THAT IS RELATIVE NEW TO MOBX 6 IS USING
// FACTORY FUNCTIONS TO CREATE OUR STORE instead of CLASSES
// note - Factory Functions are functions that create other Objects without the New keyword.

// Creating a MobX Store using a 'Factory' function Store
// note - The first param in makeAutoObservable & makeObservable is 'this' which is an Observable Object so
// We start by making call to makeAutoObservable & replacing 'this' with an 'empty object' &
// now we can make makeAutoObservable - the return value of a function & assign it to the constant variable.
const TodoStore = makeAutoObservable({
  // list state
  list: [] as Todo[],

  // adding our functions here
  // action methods to update our state
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
  },

  // note - Passing whole todo object & since objects are passed by 'reference'
  // we can simply manipulate it directly
  toggle(todo: Todo) {
    todo.isDone = !todo.isDone;
  },

  remove(todo: Todo) {
    this.list = this.list.filter(item => item.id !== todo.id);
  },

  // computed - values marks as a getter that will derive new facts from the state and cache its output
  // Computed values can be created by annotating JavaScript getters with computed value.
  get unfinishedTodos() {
    // trace can only be used inside a tracked computed value or a Reaction
    // trace();
    return this.list.filter((todo: Todo) => !todo.isDone);
  },
});

// Todo Store
// class TodoStore {
// state
// list: Todo[] = [];

// we want to connect to mobx now & make it re-active
// constructor() {
// func by mobx
// first param is Object - instance of a TodoStore
// Second param is Map of Annotation to link Properties & Methods of our Class
// with respective mobx classification to UPDATE our State Object - An Action
// makeObservable(this, {
//   // Creating Observable - trackable field property that stores the State
//   // 'observable' means piece of state which can be trackable & subscribe
//   list: observable,
//   // actions to modify the state
//   add: action,
//   toggle: action,
//   remove: action,
// });

// makeAutoObservable(target, overrides?, options?)
// makeAutoObservable is like 'makeObservable' on steroids, as it infers all the properties by default.
// makeAutoObservable function can be more compact and easier to maintain than using makeObservable,
// since new members don't have to be mentioned explicitly.
// makeAutoObservable(this, {
// note - if we do not want 'add' function to be an Action then
// Members marked with 'false' in the overrides argument will not be annotated
// add: false,
// });
// note - same like above
// All own properties become 'observable'.
// All getters become 'computed' - Computed evaluates Values Lazily & Cached them.
// All setters become 'action'.
// All functions on prototype become 'autoAction'.
// }

// note - now whenever we create an Object from our Class,
// it will automatically setup as a Mobx Store

//   // methods to update our state
//   add(title: string) {
//     // validating input
//     if (title.length < 2) {
//       return;
//     }

//     this.list.push({
//       id: Date.now(),
//       title,
//       isDone: false,
//     });
//   }

//   // note - Passing whole todo object & since objects are passed by 'reference'
//   // we can simply manipulate it directly
//   toggle(todo: Todo) {
//     todo.isDone = !todo.isDone;
//   }

//   remove(todo: Todo) {
//     this.list = this.list.filter(item => item.id !== todo.id);
//   }
// }

export default TodoStore;
