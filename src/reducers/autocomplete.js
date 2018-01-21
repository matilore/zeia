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
            return {
                ...state,
                result: {...state.result, ...action.result},
            }
        case 'RESET_AUTOCOMPLETE':
            return {
                ...state,
                inputValue: '',
                result: {},
                cursor: 0
            }
        default:
            return state;
    }
}


export default autocomplete;