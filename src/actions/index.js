import { receiveAllCoins } from './coins'
import { filterCoins, selectCoin, unsubscribeSocket, setResult } from './autocomplete';

const actionCreators = {
    receiveAllCoins,
    filterCoins,
    selectCoin,
    unsubscribeSocket,
    setResult
}

export default actionCreators