import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import store, { history } from '../store';

import PrivateRoute from '../helpers/PrivateRoute';
import MainContainer from 'containers/mainContainer';
import Home from 'containers/home';
import Navbar from 'components/Navbar';

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route component={Navbar} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auto" component={MainContainer} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default Routes;
