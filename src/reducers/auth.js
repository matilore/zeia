const initialState = {
  showModal: false,
  authAction: undefined,
  currentUser: undefined,
  isAuth: undefined,
  notification: undefined
};

function auth(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_AUTH_MODAL':
      return {
        ...state,
        showModal: true,
        authAction: action.authAction
      };
    case 'HIDE_AUTH_MODAL':
      return {
        ...state,
        showModal: false,
        authAction: undefined,
        notification: undefined
      };
    case 'SUCCESS_AUTH':
      console.log(state);
      return {
        showModal: false,
        authAction: initialState.authAction,
        currentUser: action.user,
        isAuth: true
      };
    case 'FAILED_AUTH':
      return {
        showModal: false,
        authAction: initialState.authAction,
        currentUser: undefined,
        isAuth: false
      };
    case 'NO_USER_FOUND':
      return {
        ...state,
        currentUser: undefined,
        isAuth: false,
        notification: {
          color: 'red',
          message: action.notificationMessage
        }
      };
    case 'LOGOUT':
      return {
        showModal: false,
        authAction: initialState.authAction,
        currentUser: undefined,
        isAuth: false
      };
    default:
      return state;
  }
}

export default auth;
