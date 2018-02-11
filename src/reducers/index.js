import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import coinsInfo from 'reducers/coins';
import autocomplete from 'reducers/autocomplete';
import user from 'reducers/user';
import infoGraph from 'reducers/infoGraph';

export const rootReducer = combineReducers({
  coinsInfo,
  autocomplete,
  user,
  infoGraph,
  routing
});
