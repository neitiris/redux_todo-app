import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleTodo } from './store';

const TodoList = ({ todos, setTodos, toggleTodoHandler }) => {
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
  setTodos: todos => dispatch({
    type: 'SET_TODOS',
    payload: todos,
  }),
  toggleTodoHandler: payload => dispatch(toggleTodo(payload)),
});

export default connect(mapState, mapDispatch)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTodoHandler: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
