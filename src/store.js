import { createStore } from 'redux';

import filterReducer from './redux/filter';
import todosReducer from './redux/todos';

const rootReducer = (state = {}, action = {}) => ({
  todos: todosReducer(state.todos, action),
  filter: filterReducer(state.filter, action),
});

const store = createStore(rootReducer);

export default store;
