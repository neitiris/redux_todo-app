import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getTodos } from './api';
import TodoList from './TodoList';
import { addTodo } from './store';

const App = ({ todos, setTodos, addTodo }) => {

  const [value, changeAddTodo] = useState('');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodos(todos);
      });
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();

    addTodo(value);
    changeAddTodo('');
  }

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <main className="App">
      <h1>
        Todo APP with Redux
        ({activeTodos.length})
      </h1>
      <div>
        <form onSubmit={handleAddTodo}>
          <input
            type='text'
            placeholder='Enter new todo'
            value={value}
            onChange={(event) => changeAddTodo(event.target.value)}
          />
          <button onClick={() => handleAddTodo}>Add</button>
        </form>
      </div>

      <TodoList />
    </main>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  setTodos: (todos) => dispatch({
    type: 'SET_TODOS',
    payload: todos,
  }),
  addTodo: (value) => dispatch(addTodo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
