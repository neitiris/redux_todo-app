import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTodos } from './api';
import * as todoActions from './store';
import TodoList from './TodoList';

const App = ({ todos, setTodos, addTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();

    addTodo(newTodoTitle);
    setNewTodoTitle('');
  };

  const handleNewTitleChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <main className="App">
      <h1>
        Todo APP with Redux:
        {activeTodos.length}
      </h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Enter new todo"
          value={newTodoTitle}
          onChange={handleNewTitleChange}
        />
        <button type="submit">Add</button>
      </form>

      <TodoList />
    </main>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  setTodos: todos => dispatch(todoActions.setTodos(todos)),
  addTodo: value => dispatch(todoActions.addTodo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
