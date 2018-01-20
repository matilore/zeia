import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuth = function () {
  if (localStorage.getItem('token') != null) {
    return true;
  }
  return false;
};

export default ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    isAuth() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/signup',
        state: { from: props.location }
      }} />
    )
  )} />
);
