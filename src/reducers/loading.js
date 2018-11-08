const defaultState = {
  loading: false
};

const loading = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'COMPLETED':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default loading;
