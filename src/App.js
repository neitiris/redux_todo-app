import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as todoApi from './todoApi';
import * as todoActions from './redux/todos';
import * as loadingAction from './redux/loading';
import TodoList from './TodoList';

const App = ({ activeTodos, setTodos, addTodo, enableLoading, disableLoading }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    enableLoading()

    todoApi.getTodos()
      .then(setTodos)
      .finally(disableLoading);
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();

    addTodo(newTodoTitle);
    setNewTodoTitle('');
  };

  const handleNewTitleChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  return (
    <main className="App">
      <h1>
        Todo APP with Redux:
        {activeTodos.length}
      </h1>

      {activeTodos.length
        ? <>
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
          </>
        : <p>Loading</p>
      }
    </main>
  );
};

const mapStateToProps = state => ({
  activeTodos: state.todos.filter(todo => !todo.completed),
});

const mapDispatchToProps = dispatch => ({
  setTodos: todos => dispatch(todoActions.setTodos(todos)),
  addTodo: value => dispatch(todoActions.addTodo(value)),
  enableLoading: () => dispatch(loadingAction.enableLoading()),
  disableLoading: () => dispatch(loadingAction.disableLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  activeTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
