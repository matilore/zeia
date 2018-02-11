import { receiveAllCoins } from './coins';
import { filterCoins, selectCoin, unsubscribeSocket, setResult, reset } from './autocomplete';
import { showAuthModal, hideAuthModal, makeCall, checkIsAuth, logout } from './userActions';

const actionCreators = {
  receiveAllCoins,
  filterCoins,
  selectCoin,
  unsubscribeSocket,
  setResult,
  reset,
  showAuthModal,
  hideAuthModal,
  makeCall,
  checkIsAuth,
  logout
};

export default actionCreators;
