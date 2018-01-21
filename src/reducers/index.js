import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import coinsInfo from 'reducers/coins';
import autocomplete from 'reducers/autocomplete';



export const rootReducer = combineReducers({ coinsInfo, autocomplete, routing })
