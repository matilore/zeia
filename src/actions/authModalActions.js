import axios from 'axios';

const SHOW_AUTH_MODAL = 'SHOW_AUTH_MODAL';
const HIDE_AUTH_MODAL = 'HIDE_AUTH_MODAL';
const SUCCESS_AUTH = 'SUCCESS_AUTH';
const FAILED_AUTH = 'FAILED_AUTH';

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

const failedAuth = () => ({
  type: FAILED_AUTH,
  isAuth: false
});

export const fetchUserbyToken = token => (dispatch) => {
  axios
    .post(`${AUTH_URL}`, { token })
    .then((response) => {
      dispatch(successAuth(response.data.user));
    })
    .catch((error) => {
      dispatch(failedAuth);
      console.log(error);
    });
};

export const makeCall = (params, authAction) => (dispatch) => {
  axios
    .post(`${AUTH_URL}/${authAction}`, params)
    .then((response) => {
      if (response.data.token !== undefined) {
        localStorage.setItem('token', response.data.token);
      }
      dispatch(successAuth(response.data.user));
    })
    .catch((error) => {
      dispatch(failedAuth);
      console.log(error);
    });
};
