import { combineReducers } from 'redux';

const initialAuthState = {
  showModal: false,
  authAction: undefined,
  isAuth: undefined,
  notification: undefined
};

const initialUserInfoState = {
  coins: [],
  username: undefined
};

function auth(state = initialAuthState, action) {
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
      return {
        ...state,
        showModal: false,
        isAuth: true
      };
    case 'FAILED_AUTH':
      return {
        ...state,
        showModal: false,
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
        ...state,
        showModal: false,
        currentUser: undefined,
        isAuth: false
      };
    default:
      return state;
  }
}

function userInfo(state = initialUserInfoState, action) {
  switch (action.type) {
    case 'SUCCESS_AUTH':
      const { username, coins } = action.user;
      return {
        username,
        coins
      };
    default:
      return state;
  }
}

const user = combineReducers({
  auth,
  userInfo
});

export default user;
