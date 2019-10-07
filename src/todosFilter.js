import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as filterActions from './redux/filter';

const TodosFilter = ({
  showAll,
  showCompleted,
  showActive,
  filter,
}) => (
  <>
    <button
      type="button"
      className={filter === filterActions.FILTER_VALUE_ALL
        ? 'button_selected' : ''}
      onClick={showAll}
    >
    All
    </button>
    <button
      type="button"
      className={filter === filterActions.FILTER_VALUE_COMPLETED
        ? 'button_selected' : ''}
      onClick={showCompleted}
    >
    Comleted
    </button>
    <button
      type="button"
      className={filter === filterActions.FILTER_VALUE_ACTIVE
        ? 'button_selected' : ''}
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
  showAll: () => dispatch(filterActions.showAll()),
  showCompleted: () => dispatch(filterActions.showCompleted()),
  showActive: () => dispatch(filterActions.showActive()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosFilter);

TodosFilter.propTypes = {
  showAll: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
