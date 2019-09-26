import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';
const SET_TODOS = 'SET_TODOS';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

export function toggleTodo(payload) {
  return { type: TOGGLE_TODO, payload };
}

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

export const installTodos = (todos) => ({
  type: SET_TODOS,
  todos,
});

export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });

const initialState = {
  todos: [],
  number: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };

    case TOGGLE_TODO: {
      const newTodos = state.todos.map(todo => (
        (action.payload !== todo.id)
          ? todo
          : { ...todo, completed: !todo.completed }
      ));

      return {
        ...state,
        todos: newTodos,
      };
    }

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.todoId),
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
