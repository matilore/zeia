const initialState = {
  activeCoin: undefined,
  showDetails: undefined
};

function infoGraph(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ACTIVE_COIN':
      return {
        ...state,
        activeCoinInfo: { ...state.activeCoinInfo, ...action.activeCoinInfo },
        showDetails: true
      };
    default:
      return state;
  }
}

export default infoGraph;
