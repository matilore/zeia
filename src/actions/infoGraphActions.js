import axios from 'axios';
import Socket from 'helpers/Socket';
import textFormatter from 'helpers/textHelper';

const ADD_ACTIVE_COIN = 'ADD_ACTIVE_COIN';
const REMOVE_ACTIVE_COIN = 'REMOVE_ACTIVE_COIN';

const socket = new Socket('https://streamer.cryptocompare.com/');

const selectActiveCoin = activeCoinInfo => ({
  type: ADD_ACTIVE_COIN,
  activeCoinInfo
});

export const deselectActiveCoin = () => ({
  type: REMOVE_ACTIVE_COIN
});

export const setCoinResult = (result, convertFrom, convertTo) => (dispatch, getState) => {
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

        // PATCH!!!!
        getState().infoGraph.showDetails
          ? dispatch(selectActiveCoin({ price, change24 }))
          : socket.unsubscribe();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const price = result.PRICE;
    const change24 = result.CHANGE24HOURPCT;

    // PATCH!!!!

    getState().infoGraph.showDetails
      ? dispatch(selectActiveCoin({ price, change24 }))
      : socket.unsubscribe();
  }
};

export const selectUserCoin = (coin, setCoinResult) => (dispatch) => {
  socket.unsubscribe();
  socket.subscribe(coin.name, setCoinResult);
  axios
    .get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin.name}&tsyms=EUR`)
    .then((response) => {
      const formattedResponse = response.data.DISPLAY[coin.name].EUR;
      let mrkcap = formattedResponse.MKTCAP;
      mrkcap = textFormatter(mrkcap);
      const { label, image } = coin;
      dispatch(selectActiveCoin({
        label,
        image,
        mrkcap
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};
