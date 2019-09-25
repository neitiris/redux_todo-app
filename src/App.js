import React, { useState, useEffect } from 'react';
import store from './store';

import { getTodos } from './api';
import TodoList from './TodoList';

const App = () => {
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
  const [todos, setTodos] = useState([]);

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
    const newTodos = todos.map(todo => {
      return (todoId !== todo.id)
        ? todo
        : { ...todo, completed: !todo.completed, };
    });

    setTodos(newTodos);
  };

  return (
    <main className="App">
      <h1>Todo APP with Redux</h1>

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
      />
    </main>
  );
};

export default App;
