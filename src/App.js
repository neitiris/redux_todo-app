import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as todoApi from './todoApi';
import * as todoActions from './redux/todos';
import * as loadingAction from './redux/loading';
import * as selectors from './store';
import TodoList from './TodoList';
import TodosFilter from './todosFilter';
import * as filterAction from './redux/filter';

const App = ({
  activeTodos,
  setTodos,
  addTodo,
  enableLoading,
  disableLoading,
  isLoading,
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

    todoApi.addTodoOnServer(newTodoTitle);

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

            <TodosFilter />

            <TodoList />
          </>
        )
        : <h1>Loading</h1>
      }
    </main>
  );
};

const mapStateToProps = state => ({
  activeTodos: selectors.getActiveTodos(state),
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
  toggleAll: isToggleAll => dispatch(todoActions.toggleAll(isToggleAll)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  activeTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
  enableLoading: PropTypes.func.isRequired,
  disableLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
