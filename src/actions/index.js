import { receiveAllCoins } from './coins'
import { filterCoins, selectCoin, unsubscribeSocket, setResult, reset } from './autocomplete';

const actionCreators = {
    receiveAllCoins,
    filterCoins,
    selectCoin,
    unsubscribeSocket,
    setResult,
    reset
}

export default actionCreators
