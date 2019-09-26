import { createStore } from 'redux';

const initialState = {
  todos: [],
  number: 0,
};

const SET_TODOS = 'SET_TODOS';

export const installTodos = (todos) => ({
  type: SET_TODOS,
  todos,
});

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
