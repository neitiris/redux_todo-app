import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as todoApi from './todoApi';
import * as todoActions from './redux/todos';
import * as loadingActions from './redux/loading';

const AddTodoForm = ({ addTodo, enableLoading, disableLoading }) => {
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
    todoApi.addTodoOnServer(newTodoTitle)
      .then(addTodo(newTodoTitle), setNewTodoTitle(''))
      .finally(disableLoading);
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
  addTodo: value => dispatch(todoActions.addTodo(value)),
  enableLoading: () => dispatch(loadingActions.enableLoading()),
  disableLoading: () => dispatch(loadingActions.disableLoading()),
});

export default connect(null, mapDispatchToProps)(AddTodoForm);

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  enableLoading: PropTypes.func.isRequired,
  disableLoading: PropTypes.func.isRequired,
};
