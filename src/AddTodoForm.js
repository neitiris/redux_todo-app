import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as todoApi from './todoApi';
import * as todoActions from './redux/todos';
import * as loadingAction from './redux/loading';

const AddTodoForm = ({ setTodos, enableLoading, disableLoading }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleNewTitleChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!newTodoTitle) {
      return;
    }

    enableLoading();
    todoApi
      .addTodoOnServer(newTodoTitle, setTodos)
      .finally(disableLoading);
    setNewTodoTitle('');
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Enter new todo"
        value={newTodoTitle}
        onChange={handleNewTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => ({
  setTodos: todos => dispatch(todoActions.setTodos(todos)),
  addTodo: value => dispatch(todoActions.addTodo(value)),
  enableLoading: () => dispatch(loadingAction.enableLoading()),
  disableLoading: () => dispatch(loadingAction.disableLoading()),
});

export default connect(null, mapDispatchToProps)(AddTodoForm);

AddTodoForm.propTypes = {
  setTodos: PropTypes.func.isRequired,
  enableLoading: PropTypes.func.isRequired,
  disableLoading: PropTypes.func.isRequired,
};
