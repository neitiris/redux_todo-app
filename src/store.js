import { createStore } from 'redux';

const initialState = {
  todos: [],
};

const DELETE_TODO = 'DELETE_TODO';

export const deleteTodo = value => ({ type: DELETE_TODO, value });

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.value),
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
