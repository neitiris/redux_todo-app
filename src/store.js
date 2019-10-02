import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import filterReducer from './redux/filter';
import todosReducer from './redux/todos';
import loadingReducer from './redux/loading';

const rootReducer = (state = {}, action = {}) => ({
  todos: todosReducer(state.todos, action),
  filter: filterReducer(state.filter, action),
  isLoading: loadingReducer(state.isLoading, action),
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

export const getIsLoading = state => state.isLoading;
export const getActiveTodos = state => state.todos
  .filter(todo => !todo.completed);
export const getTodos = state => state.todos;
export const getCompletedTodos = state => state.todos
  .filter(todo => todo.completed === true);

export default store;
