/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoHandler } from './store';

const TodoList = ({ todos, deletedTodo, toggleTodosHandler }) => (
  <div className="TodoList">
    <strong>Todos:</strong>

    <ul className="TodoList__list">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodosHandler(todo.id)}
            />

            {todo.title}
          </label>
          <button
            type="button"
            onClick={() => deletedTodo(todo.id)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const mapState = state => ({
  todos: state.todos,
});

const mapDispatch = dispatch => ({
  deletedTodo: todoId => dispatch(deleteTodo(todoId)),
  toggleTodosHandler: todoId => dispatch(toggleTodoHandler(todoId)),
});

export default connect(mapState, mapDispatch)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTodosHandler: PropTypes.func.isRequired,
};
