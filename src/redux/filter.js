const FILTER_VALUE_ALL = 'ALL';

const filterReducer = (filterValue = FILTER_VALUE_ALL, action = {}) => {
  switch (action.type) {
    default:
      return filterValue;
  }
};

export default filterReducer;
