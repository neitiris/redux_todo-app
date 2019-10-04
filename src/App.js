import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as todoApi from './todoApi';
import * as todoActions from './redux/todos';
import * as loadingAction from './redux/loading';
import * as selectors from './store';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import TodosFilter from './todosFilter';

const App = ({
  activeTodos,
  setTodos,
  toggleAll,
  enableLoading,
  disableLoading,
  isLoading,
}) => {
  const [isToggleAll, handleToggle] = useState(false);

  useEffect(() => {
    enableLoading();

    todoApi.getTodos()
      .then(setTodos)
      .finally(disableLoading);
  }, []);

  const handleToggleAll = () => {
    handleToggle(!isToggleAll);
    toggleAll(isToggleAll);
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
            <AddTodoForm />

            <TodosFilter />

            <label htmlFor="toggle-all">
              <input
                type="checkbox"
                id="toggle-all"
                name="toggle-all"
                checked={isToggleAll}
                onChange={() => handleToggleAll(!isToggleAll)}
              />
              Toggle all todos
            </label>

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
  enableLoading: () => dispatch(loadingAction.enableLoading()),
  disableLoading: () => dispatch(loadingAction.disableLoading()),
  toggleAll: isToggleAll => dispatch(todoActions.toggleAll(isToggleAll)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  activeTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodos: PropTypes.func.isRequired,
  enableLoading: PropTypes.func.isRequired,
  disableLoading: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
