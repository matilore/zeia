const initialState = {
  showModal: false,
  authAction: undefined,
  currentUser: undefined
};

function auth(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_AUTH_MODAL':
      return {
        showModal: true,
        authAction: action.authAction
      };
    case 'HIDE_AUTH_MODAL':
      return {
        showModal: false,
        authAction: undefined
      };
    case 'SUCCESS_AUTH':
      return {
        showModal: false,
        authAction: initialState.authAction,
        currentUser: action.user
      };
    default:
      return state;
  }
}

export default auth;
