import React from 'react';
import { Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import store, { history } from '../store';

import PrivateRoute from '../helpers/PrivateRoute';
import MainContainer from 'containers/mainContainer';

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/home" component={MainContainer} />
      </div>
    </Router>
  </Provider>
);

export default Routes;
