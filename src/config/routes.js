import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import PrivateRoute from '../helpers/PrivateRoute';
import Landing from 'containers/Landing';
import Dashboard from 'containers/Dashboard';
import Navbar from 'containers/Navbar';

import theme from 'styles/theme';
import 'styles/globalStyles';

const Routes = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div>
          <Route component={Navbar} />
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default Routes;
