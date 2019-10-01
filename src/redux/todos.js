
const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const PLACE_FIRST = 'PLACE_FIRST';
const MOVE_UP = 'MOVE_UP';
const PLACE_LAST = 'PLACE_LAST_TODO';
const SET_ORDER = 'SET_ORDER';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const addTodo = title => ({ type: ADD_TODO, title });
export const toggleTodo = todoId => ({ type: TOGGLE_TODO, todoId });
export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });
export const placeFirst = todoId => ({ type: PLACE_FIRST, todoId });
export const moveUp = todo => ({ type: MOVE_UP, todo });
export const placeLastTodo = todoId => ({ type: PLACE_LAST, todoId });
export const setOrder = (todoId, i) => ({ type: SET_ORDER, todoId, i });

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

    case DELETE_TODO:
      return todos
        .filter(todo => todo.id !== action.todoId);

    case PLACE_FIRST:
      return [
        todos.find(todo => todo.id === action.todoId),
        ...todos.filter(todo => todo.id !== action.todoId),
      ];

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

    case PLACE_LAST:
      return [...todos.filter(todo => todo.id !== action.todoId),
        todos.find(todo => todo.id === action.todoId)];

    case SET_ORDER:
      return todos
        .filter(todo => todo.id !== action.todoId)
        .splice(action.i, 0, todos.find(todo => todo.id === action.todoId));

    default:
      return todos;
  }
};

export default todosReducer;
