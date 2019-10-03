import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selectors from './store';
import * as todoActions from './redux/todos';
import * as todoApi from './todoApi';

const TodoList = ({
  todos,
  toggleTodo,
  renameTodo,
  deleteTodo,
  placeFirst,
  moveUp,
  moveDown,
  placeLastTodo,
  deleteCompleted,
}) => {
  const [newTitleOfTodo, setNewTitleOfTodo] = useState('');
  const [editedTodoId, setEditedTodoId] = useState('');

  const handleStartEditTodoTitle = (todoId, todoTitle) => {
    setNewTitleOfTodo(todoTitle);
    setEditedTodoId(todoId);
  };

  const handleChangeNewTitle = (event) => {
    setNewTitleOfTodo(event.target.value);
  };

  const handleCancelChanges = (todoTitle) => {
    setNewTitleOfTodo(todoTitle);

    if (todoTitle === newTitleOfTodo) {
      setEditedTodoId('');
    }
  };

  const handleSaveNewTitle = (event, todoId) => {
    event.preventDefault();
    const todoForChange = todos.find(todo => todo.id === todoId);

    if (newTitleOfTodo && newTitleOfTodo !== todoForChange.title) {
      renameTodo(todoId, newTitleOfTodo);
      setNewTitleOfTodo('');
      setEditedTodoId('');

      todoApi.updateTodo(todoId, newTitleOfTodo);
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
          >
            <div className="TodoList__item-name">
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    toggleTodo(todo.id);
                    todoApi.toggleTodo(todo);
                  }}
                />
              </label>
              <span onDoubleClick={() => (
                handleStartEditTodoTitle(todo.id, todo.title)
              )}
              >
                {todo.title}
              </span>

              <form
                onSubmit={event => handleSaveNewTitle(event, todo.id)}
                className={todo.id === editedTodoId ? '' : 'hide'}
              >
                <input
                  type="text"
                  value={todo.id === editedTodoId ? newTitleOfTodo : todo.title}
                  onChange={event => handleChangeNewTitle(event)}
                />

                <button type="submit">Save</button>

                <button
                  type="button"
                  onClick={() => handleCancelChanges(todo.title)}
                >
                  Cancel
                </button>
              </form>
            </div>

            <div>
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
                onClick={() => {
                  deleteTodo(todo.id);
                  todoApi.removeTodo(todo.id);
                }}
              >
              x
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => deleteCompleted()}
      >
              Clear Completed
      </button>
    </div>
  );
};

const mapState = state => ({
  todos: selectors.getVisibleTodos(state),
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
  deleteCompleted: () => dispatch(todoActions.deleteCompleted()),
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
  deleteCompleted: PropTypes.func.isRequired,
};
