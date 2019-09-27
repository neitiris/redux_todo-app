import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoHandler } from './store';

const TodoList = ({ todos, setTodos, deleteTodo, toggleTodoHandler }) => {
  return (
    <div className="TodoList">
      <strong>Todos:</strong>

      <ul className="TodoList__list">
        {todos.map(todo => (
          <li key={todo.id} className="TodoList__item">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoHandler(todo.id)}
              />

              {todo.title}
            </label>
            <button type="button" onClick={() => deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapState = state => ({
  todos: state.todos,
});

const mapDispatch = (dispatch) => ({
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  toggleTodoHandler: payload => dispatch(toggleTodoHandler(payload)),
});

export default connect(mapState, mapDispatch)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTodoHandler: PropTypes.func.isRequired,
};
