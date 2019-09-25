import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import store from './store';

import { getTodos } from './api';
import TodoList from './TodoList';

const App = ({ qwe }) => {
  useEffect(() => {
    getTodos()
      .then(todos => {
        store.dispatch({
          type: 'SET_TODOS',
          payload: todos,
        });
      });
  }, []);

  const toggleTodo = (todoId) => {
    const newTodos = qwe.map(todo => {
      return (todoId !== todo.id)
        ? todo
        : { ...todo, completed: !todo.completed };
    });

    store.dispatch({
      type: 'SET_TODOS',
      payload: newTodos,
    });
  };

  return (
    <main className="App">
      <h1>Todo APP with Redux</h1>

      <TodoList
        todos={qwe}
        toggleTodo={toggleTodo}
      />
    </main>
  );
};

const mapStateToProps = (state) => ({
  qwe: state.todos,
});
export default connect(mapStateToProps)(App);


// //
// const [todos, setTodos] = useState([]);
// //
// state = {
//   todos: []
// };
//
// const todos = this.state.todos;
//
// const setTodos = (newTodos) => {
//   this.setState({
//     todos: newTodos,
//   });
// };
