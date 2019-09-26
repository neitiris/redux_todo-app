import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { installTodos } from './store'

const TodoList = ({ todos, setTodos }) => {
  const toggleTodo = (todoId) => {
    const newTodos = todos.map(todo => ((todoId !== todo.id)
      ? todo
      : { ...todo, completed: !todo.completed }));

    setTodos(newTodos);
  };

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
                onChange={() => toggleTodo(todo.id)}
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
  setTodos: todos => dispatch(installTodos(todos)),
});

export default connect(mapState, mapDispatch)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTodo: PropTypes.func.isRequired,
};
