import { createStore } from 'redux';

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
