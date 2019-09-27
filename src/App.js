/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTodos } from './api';
import TodoList from './TodoList';
import { installTodos, addTodo } from './store';

const App = ({ todos, setTodo, addTodos }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodo(todosFromServer);
      });
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();

    addTodos(value);
    setValue('');
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <main className="App">
      <h1>
        Todo APP with Redux
        {activeTodos.length}
      </h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Enter new todo"
          value={value}
          onChange={event => setValue(event.target.value)}
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
  setTodo: todos => dispatch(installTodos(todos)),
  addTodos: value => dispatch(addTodo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
