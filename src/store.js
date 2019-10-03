import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import filterReducer, {
  FILTER_VALUE_ALL,
  FILTER_VALUE_COMPLETED,
  FILTER_VALUE_ACTIVE,
} from './redux/filter';
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
export const getTodos = state => state.todos;
export const getActiveTodos = state => state.todos
  .filter(todo => !todo.completed);
export const getCompletedTodos = state => state.todos
  .filter(todo => todo.completed);

export const getVisibleTodos = (state) => {
  switch (state.filterValue) {
    case FILTER_VALUE_ALL:
      return getTodos();

    case FILTER_VALUE_COMPLETED:
      return getCompletedTodos();

    case FILTER_VALUE_ACTIVE:
      return getActiveTodos();

    default:
      return state.todos;
  }
};

export default store;
