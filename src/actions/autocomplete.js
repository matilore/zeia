import axios from 'axios'
import Socket from 'helpers/Socket';
import textFormatter from 'helpers/textHelper';


const FILTER_COINS = 'FILTER_COINS';
const SELECT_COIN = 'SELECT_COIN';
const SET_SELECTED_COIN = 'SET_SELECTED_COIN';


const socket = new Socket('https://streamer.cryptocompare.com/');


const setSelectedCoin = (result) => {
    return {
        type: SET_SELECTED_COIN,
        result
    }
}


export const filterCoins = (allCoins, inputValue) => {
    const filteredCoins = allCoins.filter((coin) => (
        coin.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        coin.name.toLowerCase().includes(inputValue.toLowerCase())
    )).slice(0, 10)

    return {
        type: FILTER_COINS,
        filteredCoins,
        inputValue
    };
}

export const selectCoin = (selection, setResult) => {
    return dispatch => {
    const coin = typeof selection === 'string' ? selection : selection.target.getAttribute('data-name');
    socket.unsubscribe();
    socket.subscribe(coin, setResult);
    axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=EUR`)
        .then((response) => {
            const formattedResponse = response.data.DISPLAY[coin].EUR;
            let mrkcap = formattedResponse.MKTCAP;
            mrkcap = textFormatter(mrkcap);
            dispatch(setSelectedCoin({mrkcap}));
        })
        .catch(function (error) {
            console.log(error);
        });
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
