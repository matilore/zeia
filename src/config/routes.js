import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import store from './store';
import history from './history';

import PrivateRoute from '../helpers/PrivateRoute';
import MainContainer from 'containers/mainContainer';
import Home from 'containers/home';
import User from 'containers/User';
import Navbar from 'components/Navbar';

import theme from 'styles/theme';
import 'styles/globalStyles';

const Routes = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div>
          <Route component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/user" component={User} />
            <PrivateRoute path="/user" component={MainContainer} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default Routes;
