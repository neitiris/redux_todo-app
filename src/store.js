import { createStore } from 'redux';

const TOGGLE_TODO = 'TOGGLE_TODO';

export function toggleTodo(payload) {
  return { type: TOGGLE_TODO, payload };
}

const initialState = {
  todos: [],
};

const DELETE_TODO = 'DELETE_TODO';

export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
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

    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

export default store;
