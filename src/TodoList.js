import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as todoActions from './redux/todos';

const TodoList = ({
  todos, toggleTodo, deleteTodo, placeFirst,
}) => (
  <div className="TodoList">
    <strong>Todos:</strong>

    <ul className="TodoList__list">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            {todo.title}
          </label>
          <button
            type="button"
            onClick={() => placeFirst(todo.id)}
          >
            Place First
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

const mapState = state => ({
  todos: state.todos,
});

const mapDispatch = dispatch => ({
  deleteTodo: todoId => dispatch(todoActions.deleteTodo(todoId)),
  toggleTodo: todoId => dispatch(todoActions.toggleTodo(todoId)),
  placeFirst: todoId => dispatch(todoActions.placeFirst(todoId)),
});

export default connect(mapState, mapDispatch)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  placeFirst: PropTypes.func.isRequired,
};
