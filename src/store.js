import { createStore } from 'redux';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_TODOS = 'SET_TODOS';
const TOGGLE_TODO = 'TOGGLE_TODO';

export const installTodos = todos => ({
  type: SET_TODOS,
  todos,
});
export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });
export const setTodos = todos => ({ type: SET_TODOS, todos });
export const toggleTodoHandler = todoId => ({ type: TOGGLE_TODO, todoId });
export const addTodo = value => ({
  type: ADD_TODO,
  value: {
    id: Date.now(),
    title: value,
    completed: false,
  },
});

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
        (action.todoId !== todo.id)
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
