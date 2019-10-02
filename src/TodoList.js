import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as todoActions from './redux/todos';

const TodoList = ({
  todos,
  toggleTodo,
  renameTodo,
  deleteTodo,
  placeFirst,
  moveUp,
  moveDown,
  placeLastTodo,
}) => {
  const [newTitleOfTodo, setNewTitleOfTodo] = useState('');
  const [editedTodoId, setEditedTodoId] = useState('');

  const handleSaveNewTitle = (event, todoTitle) => {
    event.preventDefault();

    if (newTitleOfTodo && newTitleOfTodo !== todoTitle) {
      renameTodo(editedTodoId, newTitleOfTodo);
      setNewTitleOfTodo('');
      setEditedTodoId('');
    }
  };

  const handleNewTitleChange = (event, todoId) => {
    setNewTitleOfTodo(event.target.value);
    setEditedTodoId(todoId);
  };

  const handleEditedTodo = (todoId, todoTitle) => {
    setNewTitleOfTodo(todoTitle);
    setEditedTodoId(todoId);
  };

  const handleCancel = (todoTitle) => {
    setNewTitleOfTodo(todoTitle);

    if (todoTitle === newTitleOfTodo) {
      setEditedTodoId('');
    }
  };

  return (
    <div className="TodoList">
      <strong>Todos:</strong>

      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="TodoList__item"
            onDoubleClick={() => handleEditedTodo(todo.id, todo.title)}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.title}
            </label>

            <form
              onSubmit={event => handleSaveNewTitle(event, todo.title)}
              className={todo.id === editedTodoId ? '' : 'hide'}
            >
              <input
                type="text"
                value={todo.id === editedTodoId ? newTitleOfTodo : todo.title}
                onChange={event => handleNewTitleChange(event, todo.id)}
              />

              <button type="submit">Save</button>

              <button
                type="button"
                onClick={() => handleCancel(todo.title)}
              >
                Cancel
              </button>
            </form>

            <button
              type="button"
              onClick={() => placeFirst(todo.id)}
            >
            Place First
            </button>

            <button
              type="button"
              onClick={() => moveUp(todo)}
            >
            Move up
            </button>

            <button
              type="button"
              onClick={() => moveDown(todo.id)}
            >
            Move down
            </button>

            <button
              type="button"
              onClick={() => placeLastTodo(todo.id)}
            >
            Move to the end
            </button>

            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
            >
            x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapState = state => ({
  todos: state.todos,
});

const mapDispatch = dispatch => ({
  deleteTodo: todoId => dispatch(todoActions.deleteTodo(todoId)),
  toggleTodo: todoId => dispatch(todoActions.toggleTodo(todoId)),
  renameTodo: (todoId, newTitle) => (
    dispatch(todoActions.renameTodo(todoId, newTitle))
  ),
  placeFirst: todoId => dispatch(todoActions.placeFirst(todoId)),
  moveUp: todo => dispatch(todoActions.moveUp(todo)),
  moveDown: todoId => dispatch(todoActions.moveDown(todoId)),
  placeLastTodo: todoId => dispatch(todoActions.placeLast(todoId)),
});

export default connect(mapState, mapDispatch)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  renameTodo: PropTypes.func.isRequired,
  moveUp: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  moveDown: PropTypes.func.isRequired,
  placeLastTodo: PropTypes.func.isRequired,
  placeFirst: PropTypes.func.isRequired,
};
