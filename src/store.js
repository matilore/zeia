import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import { rootReducer } from './reducers/index'

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// Create an enhanced history that syncs navigation events with the store
// Any time you navigate, which can come from pressing browser buttons or navigating in your application code,
// the enhanced history will first pass the new location through the Redux store and then on to React Router to update the component tree.
// If you time travel, it will also pass the new state to React Router to update the component tree again.
export const history = syncHistoryWithStore(createHistory(), store)

export default store
