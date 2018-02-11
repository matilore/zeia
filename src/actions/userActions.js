import axios from 'axios';
import history from 'config/history';

const SHOW_AUTH_MODAL = 'SHOW_AUTH_MODAL';
const HIDE_AUTH_MODAL = 'HIDE_AUTH_MODAL';
const SUCCESS_AUTH = 'SUCCESS_AUTH';
const FAILED_AUTH = 'FAILED_AUTH';
const LOGOUT = 'LOGOUT';
const NO_USER_FOUND = 'NO_USER_FOUND';

const AUTH_URL = 'http://localhost:3000/api';

export const showAuthModal = authAction => ({
  type: SHOW_AUTH_MODAL,
  authAction
});

export const hideAuthModal = () => ({
  type: HIDE_AUTH_MODAL
});

const successAuth = user => ({
  type: SUCCESS_AUTH,
  isAuth: true,
  user
});

const noAuth = () => ({
  type: FAILED_AUTH,
  isAuth: false
});

export const logout = () => {
  history.push('/');
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
    isAuth: false
  };
};

export const checkIsAuth = () => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    token !== null ? fetchUserbyToken(token, dispatch) : dispatch(noAuth());
  };
};

const noUserFound = notificationMessage => ({
  type: NO_USER_FOUND,
  notificationMessage
});

const fetchUserbyToken = (token, dispatch) => {
  axios
    .post(`${AUTH_URL}`, { token })
    .then((response) => {
      dispatch(successAuth(response.data.user));
    })
    .catch((error) => {
      dispatch(noAuth());
      console.log(error);
    });
};

export const makeCall = (params, authAction) => (dispatch) => {
  console.log(params);
  axios
    .post(`${AUTH_URL}/${authAction}`, params)
    .then((response) => {
      if (response.data.token !== undefined) {
        localStorage.setItem('token', response.data.token);
      }
      dispatch(successAuth(response.data.user));
      history.push('/user');
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(noUserFound(error.response.data.message));
      } else {
        dispatch(noAuth());
      }
      console.dir(error);
    });
};
