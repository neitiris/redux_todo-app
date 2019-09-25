import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <div className="TodoList">
    <strong>Todos:</strong>

    <ul className="TodoList__list">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
            />

            {todo.title}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
