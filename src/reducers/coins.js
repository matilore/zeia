const initialState = {
    allCoins: [],
    fetchingAllCoins: false,
    failedFetchingAllCoins: false
};

function coinsInfo(state = initialState, action) {
    switch (action.type) {
        case 'FETCHING_ALL_COINS':
            return {
                ...state,
                fetchingAllCoins: true
            }
        case 'ADD_ALL_COINS':
            return {
                failedFetchingAllCoins: false,
                fetchingAllCoins: false,
                allCoins: action.payload
            }
        case 'FAILED_FETCHING_ALL_COINS':
            return {
                failedFetchingAllCoins: true
            }
        default:
            return state;
    }
}


export default coinsInfo;