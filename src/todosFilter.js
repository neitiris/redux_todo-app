import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as filterAction from './redux/filter';

const TodosFilter = ({
  showAll,
  showCompleted,
  showActive,
  filter,
  FILTER_VALUE_ALL,
  FILTER_VALUE_COMPLETED,
  FILTER_VALUE_ACTIVE,
}) => (
  <>
    <button
      type="button"
      className={filter === FILTER_VALUE_ALL && 'button_selected'}
      onClick={showAll}
    >
    All
    </button>
    <button
      type="button"
      className={filter === FILTER_VALUE_COMPLETED && 'button_selected'}
      onClick={showCompleted}
    >
    Comleted
    </button>
    <button
      type="button"
      className={filter === FILTER_VALUE_ACTIVE && 'button_selected'}
      onClick={showActive}
    >
    Active
    </button>
  </>
);

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  showAll: () => dispatch(filterAction.showAll()),
  showCompleted: () => dispatch(filterAction.showCompleted()),
  showActive: () => dispatch(filterAction.showActive()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosFilter);

TodosFilter.propTypes = {
  showAll: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
  filter: PropTypes.bool.isRequired,
  FILTER_VALUE_ALL: PropTypes.string.isRequired,
  FILTER_VALUE_COMPLETED: PropTypes.string.isRequired,
  FILTER_VALUE_ACTIVE: PropTypes.string.isRequired,
};
