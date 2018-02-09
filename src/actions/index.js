import { receiveAllCoins } from './coins';
import { filterCoins, selectCoin, unsubscribeSocket, setResult, reset } from './autocomplete';
import { showAuthModal, hideAuthModal, makeCall, fetchUserbyToken } from './authModalActions';

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
  fetchUserbyToken
};

export default actionCreators;
