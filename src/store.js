import { createStore } from 'redux';

import filterReducer from './redux/filter';
import todosReducer from './redux/todos';
import loadingReducer from './redux/loading';

const rootReducer = (state = {}, action = {}) => ({
  todos: todosReducer(state.todos, action),
  filter: filterReducer(state.filter, action),
  isLoading: loadingReducer(state.isLoading, action),
});

const store = createStore(rootReducer);

export default store;
