import { showAuthModal, hideAuthModal, makeCall, checkIsAuth, logout } from './userActions';
import { selectUserCoin, setCoinResult, deselectActiveCoin } from './infoGraphActions';

const actionCreators = {
  showAuthModal,
  hideAuthModal,
  makeCall,
  checkIsAuth,
  logout,
  selectUserCoin,
  setCoinResult,
  deselectActiveCoin
};

export default actionCreators;
