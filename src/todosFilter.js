import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as filterAction from './redux/filter';

const TodosFilter = ({ showAll, showCompleted, showActive }) => (
  <div>
    <button type="button" onClick={showAll}>All</button>
    <button type="button" onClick={showCompleted}>Comleted</button>
    <button type="button" onClick={showActive}>Active</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  showAll: () => dispatch(filterAction.showAll()),
  showCompleted: () => dispatch(filterAction.showCompleted()),
  showActive: () => dispatch(filterAction.showActive()),
});

export default connect(null, mapDispatchToProps)(TodosFilter);

TodosFilter.propTypes = {
  showAll: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
};
