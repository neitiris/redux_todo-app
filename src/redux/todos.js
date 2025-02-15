import uuidv1 from 'uuid/v1';
import { removeCompleted } from '../todoApi';

const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const TOGGLE_ALL = 'TOGGLE_ALL';
const RENAME_TODO = 'RENAME_TODO';
const DELETE_TODO = 'DELETE_TODO';
const DELETE_COMPLETED = 'DELETE_COMPLETED';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const PLACE_FIRST = 'PLACE_FIRST';
const PLACE_LAST = 'PLACE_LAST';
const SET_ORDER = 'SET_ORDER';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const addTodo = title => ({ type: ADD_TODO, title });
export const toggleTodo = todoId => ({ type: TOGGLE_TODO, todoId });
export const toggleAll = isToggleAll => ({ type: TOGGLE_ALL, isToggleAll });
export const renameTodo = (todoId, newTitle) => (
  { type: RENAME_TODO, todoId, newTitle }
);
export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });
export const deleteCompleted = () => ({ type: DELETE_COMPLETED });
export const placeFirst = todoId => ({ type: PLACE_FIRST, todoId });
export const moveUp = todo => ({ type: MOVE_UP, todo });
export const moveDown = todoId => ({ type: MOVE_DOWN, todoId });
export const placeLast = todoId => ({ type: PLACE_LAST, todoId });
export const setOrder = (todoId, i) => ({ type: SET_ORDER, todoId, i });

const todosReducer = (todos = [], action = {}) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;

    case ADD_TODO:
      return [...todos, {
        id: uuidv1('uuid/v1'),
        title: action.title,
        completed: false,
      }];

    case TOGGLE_TODO:
      return todos.map(todo => (
        (action.todoId !== todo.id)
          ? todo
          : { ...todo, completed: !todo.completed }
      ));

    case TOGGLE_ALL:
      return todos.map(todo => ({
        ...todo,
        completed: !action.isToggleAll,
      }));

    case RENAME_TODO:
      return todos.map(todo => (
        (action.todoId !== todo.id)
          ? todo
          : { ...todo, title: action.newTitle }
      ));

    case DELETE_TODO:
      return todos
        .filter(todo => todo.id !== action.todoId);

    case DELETE_COMPLETED:
      removeCompleted(todos.filter(todo => todo.completed));

      return todos.filter(todo => !todo.completed);

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

    case MOVE_DOWN: {
      const copyTodos = [...todos];
      const i = copyTodos.findIndex(todo => todo.id === action.todoId);

      if (i === todos.length - 1) {
        return copyTodos;
      }

      const temp = copyTodos[i];

      copyTodos[i] = copyTodos[i + 1];
      copyTodos[i + 1] = temp;

      return copyTodos;
    }

    case PLACE_FIRST:
      return [
        todos.find(todo => todo.id === action.todoId),
        ...todos.filter(todo => todo.id !== action.todoId),
      ];

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
