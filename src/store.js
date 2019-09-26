import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';

const initialState = {
  todos: [],
};

//actions
export function addTodo(value) {
  
  return {
    type: ADD_TODO,
    value: {
      id: Date.now(),
      title: value,
      completed: false,
    },
  }
}
//

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.value],
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
