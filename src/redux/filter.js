export const FILTER_VALUE_ALL = 'ALL';
export const FILTER_VALUE_COMPLETED = 'COMPLETED';
export const FILTER_VALUE_ACTIVE = 'ACTIVE';

const SHOW_ALL = 'SHOW_ALL';
const SHOW_COMPLETED = 'SHOW_COMPLETED';
const SHOW_ACTIVE = 'SHOW_ACTIVE';

export const showAll = () => ({ type: SHOW_ALL });
export const showCompleted = () => ({ type: SHOW_COMPLETED });
export const showActive = () => ({ type: SHOW_ACTIVE });

const filterReducer = (filterValue = FILTER_VALUE_ALL, action = {}) => {
  switch (action.type) {
    case SHOW_ALL:
      return FILTER_VALUE_ALL;

    case SHOW_COMPLETED:
      return FILTER_VALUE_COMPLETED;

    case SHOW_ACTIVE:
      return FILTER_VALUE_ACTIVE;

    default:
      return filterValue;
  }
};

export default (filterReducer);
