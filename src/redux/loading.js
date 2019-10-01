const ENABLE_LOADING = 'ENABLE_LOADING'
const DISABLE_LOADING = 'DISABLE_LOADING'

export const enableLoading = () => ({ type: ENABLE_LOADING });
export const disableLoading = () => ({ type: DISABLE_LOADING });

const loadingReducer = (isLoading = true, action = {}) => {
  switch (action.type) {
    case DISABLE_LOADING:
      return false;

    case ENABLE_LOADING:
      return true;

    default:
      return isLoading;
  }
};

export default loadingReducer;
