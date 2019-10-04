import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as selectors from './store';
import * as todoActions from './redux/todos';
import * as todoApi from './todoApi';
import * as loadingAction from './redux/loading';

const TodoList = ({
  todos,
  allCompleted,
  toggleTodo,
  toggleAll,
  renameTodo,
  deleteTodo,
  deleteCompleted,
  placeFirst,
  moveUp,
  moveDown,
  placeLastTodo,
  enableLoading,
  disableLoading,
  removeCompleted,
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

  const handleSaveNewTitle = (event) => {
    event.preventDefault();
    const todoForChange = todos.find(todo => todo.id === editedTodoId);

    if (newTitleOfTodo && newTitleOfTodo !== todoForChange.title) {
      renameTodo(editedTodoId, newTitleOfTodo);
      setNewTitleOfTodo('');
      setEditedTodoId('');

      todoApi.updateTodoTitle(editedTodoId, newTitleOfTodo);
    }
  };

  const handleClearCompleted = async() => {
    enableLoading();
    await removeCompleted(todos.filter(todo => todo.completed));
    deleteCompleted();
    disableLoading();
  };

  return (
    <div className="TodoList">
      <strong>Todos:</strong>

      <div className="TodoList__toggle-all">
        <label htmlFor="toggle-all">
          <input
            type="checkbox"
            id="toggle-all"
            name="toggle-all"
            checked={allCompleted}
            onChange={() => toggleAll(allCompleted)}
          />
          Toggle all todos
        </label>
      </div>

      <ul className="TodoList__list">
        {todos.map((todo, index) => (
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
                onSubmit={handleSaveNewTitle}
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
                onClick={() => {
                  placeFirst(todo.id);
                  if (index !== 0) {
                    todoApi.moveTodo(todo.id, 0);
                  }
                }}
              >
                Place First
              </button>

              <button
                type="button"
                onClick={() => {
                  moveUp(todo);
                  if (index !== 0) {
                    todoApi.moveTodo(todo.id, index - 1);
                  }
                }}
              >
                Move up
              </button>

              <button
                type="button"
                onClick={() => {
                  moveDown(todo.id);
                  if (index !== todos.length - 1) {
                    todoApi.moveTodo(todo.id, index + 1);
                  }
                }}
              >
              Move down
              </button>

              <button
                type="button"
                onClick={() => {
                  placeLastTodo(todo.id);
                  if (index !== todos.length - 1) {
                    todoApi.moveTodo(todo.id, todos.length - 1);
                  }
                }}
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
        onClick={() => handleClearCompleted()}
      >
              Clear Completed
      </button>
    </div>
  );
};

const mapState = state => ({
  todos: selectors.getVisibleTodos(state),
  allCompleted: selectors.getAllCompleted(state),
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
  enableLoading: () => dispatch(loadingAction.enableLoading()),
  disableLoading: () => dispatch(loadingAction.disableLoading()),
  toggleAll: isToggleAll => dispatch(todoActions.toggleAll(isToggleAll)),
});

export default connect(mapState, mapDispatch)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  allCompleted: PropTypes.bool.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  renameTodo: PropTypes.func.isRequired,
  moveUp: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  moveDown: PropTypes.func.isRequired,
  placeLastTodo: PropTypes.func.isRequired,
  placeFirst: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  enableLoading: PropTypes.func.isRequired,
  disableLoading: PropTypes.func.isRequired,
  removeCompleted: PropTypes.func.isRequired,
};
