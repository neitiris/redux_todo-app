
const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const MOVE_UP = 'MOVE_UP';
const DELETE_TODO = 'DELETE_TODO';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const addTodo = title => ({ type: ADD_TODO, title });
export const toggleTodo = todoId => ({ type: TOGGLE_TODO, todoId });
export const moveUp = todo => ({ type: MOVE_UP, todo });
export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });

const todosReducer = (todos = [], action = {}) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;

    case ADD_TODO:
      return [...todos, {
        id: Date.now(),
        title: action.title,
        completed: false,
      }];

    case TOGGLE_TODO:
      return todos.map(todo => (
        (action.todoId !== todo.id)
          ? todo
          : { ...todo, completed: !todo.completed }
      ));

    case MOVE_UP: {
      const currentPosition = todos
        .findIndex(todo => todo.id === action.todo.id);

      if (currentPosition === 0) {
        return todos;
      }

      const newTodos = [...todos];

      newTodos[currentPosition] = newTodos[currentPosition - 1];
      newTodos[currentPosition - 1] = action.todo;

      return newTodos;
    }

    case DELETE_TODO:
      return todos
        .filter(todo => todo.id !== action.todoId);

    default:
      return todos;
  }
};

export default todosReducer;
