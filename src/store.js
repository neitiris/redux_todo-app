import { createStore } from 'redux';

const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const addTodo = title => ({ type: ADD_TODO, title });
export const toggleTodo = todoId => ({ type: TOGGLE_TODO, todoId });
export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.todos };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          title: action.title,
          completed: false,
        }],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => (
          (action.todoId !== todo.id)
            ? todo
            : { ...todo, completed: !todo.completed }
        )),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
