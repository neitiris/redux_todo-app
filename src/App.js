import React, { useState, useEffect } from 'react';

import { getTodos } from './api';
import TodoList from './TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos()
      .then(todos => setTodos(todos))
  }, []);

  return (
    <main className="App">
      <h1>Todo APP with Redux</h1>

      <TodoList todos={todos} />
    </main>
  );
};

export default App;
