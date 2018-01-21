const initialState = {
    inputValue: '',
    cursor: 0,
    result: {},
    filteredCoins: []
};

function autocomplete(state = initialState, action) {
    switch (action.type) {
        case 'FILTER_COINS':
            return {
                ...state,
                filteredCoins: action.filteredCoins,
                inputValue: action.inputValue
            }
        case 'SET_SELECTED_COIN':
        console.log(action)
            return {
                ...state,
                result: {...state.result, ...action.result},
            }
        default:
            return state;
    }
}


export default autocomplete;