import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as todoApi from './todoApi';
import * as todoActions from './redux/todos';
import * as loadingAction from './redux/loading';
import * as filterAction from './redux/filter';
import * as selectors from './store';
import TodoList from './TodoList';

const App = ({
  activeTodos,
  setTodos,
  addTodo,
  enableLoading,
  disableLoading,
  isLoading,
  showAll,
  showCompleted,
  showActive,
}) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    enableLoading();

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

      {!isLoading
        ? (
          <>
            <form onSubmit={handleAddTodo}>
              <input
                type="text"
                placeholder="Enter new todo"
                value={newTodoTitle}
                onChange={handleNewTitleChange}
              />
              <button type="submit">Add</button>
            </form>

            <button type="button" onClick={showAll}>All</button>
            <button type="button" onClick={showCompleted}>Comleted</button>
            <button type="button" onClick={showActive}>Active</button>

            <TodoList />
          </>
        )
        : <h1>Loading</h1>
      }
    </main>
  );
};

const mapStateToProps = state => ({
  activeTodos: state.todos.filter(todo => !todo.completed),
  isLoading: selectors.getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
  setTodos: todos => dispatch(todoActions.setTodos(todos)),
  addTodo: value => dispatch(todoActions.addTodo(value)),
  enableLoading: () => dispatch(loadingAction.enableLoading()),
  disableLoading: () => dispatch(loadingAction.disableLoading()),
  showAll: () => dispatch(filterAction.showAll()),
  showCompleted: () => dispatch(filterAction.showCompleted()),
  showActive: () => dispatch(filterAction.showActive()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  activeTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
  enableLoading: PropTypes.func.isRequired,
  disableLoading: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
