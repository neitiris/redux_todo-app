
const SET_TODOS = 'SET_TODOS';
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const MOVE_DOWN = 'MOVE_DOWN';

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const addTodo = title => ({ type: ADD_TODO, title });
export const toggleTodo = todoId => ({ type: TOGGLE_TODO, todoId });
export const deleteTodo = todoId => ({ type: DELETE_TODO, todoId });
export const moveDown = todoId => ({ type: MOVE_DOWN, todoId });

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

    case MOVE_DOWN: {
      const copyTodos = [...todos];
      const i = copyTodos.findIndex(todo => todo.id === action.todoId);

      if (copyTodos[i] === copyTodos[copyTodos.length - 1]) {
        return copyTodos;
      }

      const temp = copyTodos[i];

      copyTodos[i] = copyTodos[i + 1];
      copyTodos[i + 1] = temp;

      return copyTodos;
    }

    default:
      return todos;
  }
};

export default todosReducer;
