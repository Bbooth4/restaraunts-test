const defaultState = {};

const restaraunts = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOAD_RESTARAUNT':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default restaraunts;
