import axios from 'axios'


const FETCHING_ALL_COINS = 'FETCHING_ALL_COINS';
const ADD_ALL_COINS = "ADD_ALL_COINS"
const FAILED_FETCHING_ALL_COINS = 'FAILED_FETCHING_ALL_COINS';

const fetchingAllCoins = () => {
    return {
        type: FETCHING_ALL_COINS
    };
}

const addCoins = (allCoins) => {
    return {
        type: ADD_ALL_COINS,
        payload: allCoins
    }
}

const failedFetchingAllCoins = () => {
    return {
        type: FAILED_FETCHING_ALL_COINS
    }
}


export function receiveAllCoins() {
    return dispatch => {
        dispatch(fetchingAllCoins());
        axios.get(`https://min-api.cryptocompare.com/data/all/coinlist`)
            .then((response) => {
                let allCoins = response.data.Data;
                const allKeys = Object.keys(response.data.Data);
                allCoins = allKeys.map((key) => {
                    return { image: allCoins[key].ImageUrl, name: allCoins[key].Name, label: allCoins[key].CoinName }
                });
                dispatch(addCoins(allCoins));
            })
            .catch(function (error) {
                console.log('ERROR IN RECEIVING ALL COINS: ', error);
                dispatch(failedFetchingAllCoins());
            });
    };
}

