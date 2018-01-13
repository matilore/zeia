import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from 'react-redux'

import store , { history } from '../store'

import PrivateRoute from '../helpers/PrivateRoute'
import MainContainer from 'containers/mainContainer'


const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path='/' component={MainContainer}></Route>
      </div>
    </Router>
  </Provider>

)

export default Routes