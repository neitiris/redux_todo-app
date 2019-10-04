import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as filterAction from './redux/filter';

const TodosFilter = ({
  showAll,
  showCompleted,
  showActive,
  filter,
}) => (
  <>
    <button
      type="button"
      className={filter === 'ALL' && 'button_selected'}
      onClick={showAll}
    >
    All
    </button>
    <button
      type="button"
      className={filter === 'COMPLETED' && 'button_selected'}
      onClick={showCompleted}
    >
    Comleted
    </button>
    <button
      type="button"
      className={filter === 'ACTIVE' && 'button_selected'}
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
};
