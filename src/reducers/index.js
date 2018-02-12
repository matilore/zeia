import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from 'reducers/user';
import infoGraph from 'reducers/infoGraph';

export const rootReducer = combineReducers({
  user,
  infoGraph,
  routing
});
