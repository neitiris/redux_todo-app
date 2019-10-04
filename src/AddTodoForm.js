import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as todoApi from './todoApi';
import * as todoActions from './redux/todos';

const AddTodoForm = ({ addTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleNewTitleChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!newTodoTitle) {
      return;
    }

    todoApi.addTodoOnServer(newTodoTitle);

    addTodo(newTodoTitle);
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
  addTodo: value => dispatch(todoActions.addTodo(value)),
});

export default connect(null, mapDispatchToProps)(AddTodoForm);

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
