const initialState = {
  activeCoin: undefined,
  showDetails: undefined
};

function infoGraph(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ACTIVE_COIN':
      return {
        activeCoinInfo: { ...state.activeCoinInfo, ...action.activeCoinInfo },
        showDetails: true
      };
    case 'REMOVE_ACTIVE_COIN':
      return {
        activeCoinInfo: undefined,
        showDetails: false
      };
    default:
      return state;
  }
}

export default infoGraph;
