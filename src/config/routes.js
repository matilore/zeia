import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';

import { Provider } from 'react-redux';

import store from './store';
import history from './history';

import PrivateRoute from '../helpers/PrivateRoute';
import MainContainer from 'containers/mainContainer';
import Home from 'containers/home';
import Navbar from 'components/Navbar';

import theme from 'styles/theme';

const Routes = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div>
          <Route component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user" component={MainContainer} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  </Provider>
);

injectGlobal`
  body {
    font-family: 'Orbitron', sans-serif
  }
`;

export default Routes;
