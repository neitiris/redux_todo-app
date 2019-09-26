import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getTodos } from './api';
import TodoList from './TodoList';

const App = ({ todos, setTodos }) => {
  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodos(todos);
      });
  }, []);

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <main className="App">
      <h1>
        Todo APP with Redux
        ({activeTodos.length})
      </h1>

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
