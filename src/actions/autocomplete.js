import axios from 'axios';
import Socket from 'helpers/Socket';
import textFormatter from 'helpers/textHelper';

const FILTER_COINS = 'FILTER_COINS';
const SELECT_COIN = 'SELECT_COIN';
const SET_SELECTED_COIN = 'SET_SELECTED_COIN';
const RESET_AUTOCOMPLETE = 'RESET_AUTOCOMPLETE';

const socket = new Socket('https://streamer.cryptocompare.com/');

const setSelectedCoin = result => ({
  type: SET_SELECTED_COIN,
  result
});

export const filterCoins = (allCoins, inputValue) => {
  const filteredCoins = allCoins
    .filter(coin =>
      coin.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        coin.name.toLowerCase().includes(inputValue.toLowerCase()))
    .slice(0, 10);
  console.log(filteredCoins);
  return {
    type: FILTER_COINS,
    filteredCoins,
    inputValue
  };
};

export const selectCoin = (selection, setResult) => (dispatch) => {
  const coin =
    typeof selection === 'string' ? selection : selection.target.getAttribute('data-name');
  socket.unsubscribe();
  socket.subscribe(coin, setResult);
  axios
    .get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${selection}&tsyms=EUR`)
    .then((response) => {
      const formattedResponse = response.data.DISPLAY[coin].EUR;
      let mrkcap = formattedResponse.MKTCAP;
      mrkcap = textFormatter(mrkcap);
      dispatch(setSelectedCoin({ mrkcap }));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setResult = (result, convertFrom, convertTo) => (dispatch) => {
  if (convertTo === 'BTC') {
    axios
      .get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=EUR')
      .then((response) => {
        const formattedResponse = response.data.DISPLAY.BTC.EUR;
        let price = formattedResponse.PRICE;
        price = price.slice(2, price.length - 1);
        price = price.split(',').join('');
        price = parseFloat(price);
        price = parseFloat(result.PRICE * price).toFixed(4);
        const change24 = result.CHANGE24HOURPCT;
        dispatch(setSelectedCoin({ price, change24 }));
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const price = result.PRICE;
    const change24 = result.CHANGE24HOURPCT;
    dispatch(setSelectedCoin({ price, change24 }));
  }
};

const resetAutocomplete = () => ({
  type: RESET_AUTOCOMPLETE
});

const unsubscribeSocket = () => {
  socket.unsubscribe();
};

export const reset = () => {
  unsubscribeSocket();
  return (dispatch) => {
    dispatch(resetAutocomplete());
  };
};

export function receiveAllCoins() {
  return (dispatch) => {
    dispatch(fetchingAllCoins());
    axios
      .get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then((response) => {
        let allCoins = response.data.Data;
        const allKeys = Object.keys(response.data.Data);
        allCoins = allKeys.map(key => ({
          image: allCoins[key].ImageUrl,
          name: allCoins[key].Name,
          label: allCoins[key].CoinName
        }));
        dispatch(addCoins(allCoins));
      })
      .catch((error) => {
        console.log('ERROR IN RECEIVING ALL COINS: ', error);
        dispatch(failedFetchingAllCoins());
      });
  };
}
