import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getTodos } from './api';
import TodoList from './TodoList';

const App = ({ todosFromStore, setTodos }) => {
  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodos(todos);
      });
  }, []);

  const toggleTodo = (todoId) => {
    const newTodos = todosFromStore.map(todo => {
      return (todoId !== todo.id)
        ? todo
        : { ...todo, completed: !todo.completed };
    });

    setTodos(newTodos);
  };

  return (
    <main className="App">
      <h1>Todo APP with Redux</h1>

      <TodoList
        todos={todosFromStore}
        toggleTodo={toggleTodo}
      />
    </main>
  );
};

const mapStateToProps = (state) => ({
  todosFromStore: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  setTodos: (todos) => dispatch({
    type: 'SET_TODOS',
    payload: todos,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


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
