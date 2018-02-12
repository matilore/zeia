import { showAuthModal, hideAuthModal, makeCall, checkIsAuth, logout } from './userActions';
import { selectCoin, deselectActiveCoin } from './coinDetailsActions';

const actionCreators = {
  showAuthModal,
  hideAuthModal,
  makeCall,
  checkIsAuth,
  logout,
  selectCoin,
  deselectActiveCoin
};

export default actionCreators;
