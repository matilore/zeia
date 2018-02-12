import axios from 'axios';
import Socket from 'helpers/Socket';
import textFormatter from 'helpers/textHelper';

const ADD_ACTIVE_COIN = 'ADD_ACTIVE_COIN';
const REMOVE_ACTIVE_COIN = 'REMOVE_ACTIVE_COIN';

const selectActiveCoin = activeCoinInfo => ({
  type: ADD_ACTIVE_COIN,
  activeCoinInfo
});

const removeActiveCoin = () => ({
  type: REMOVE_ACTIVE_COIN
});

export default class ApiController {
  constructor(sockerUrl) {
    this.priceBTC = undefined;
    this.selectedCoinPrice = undefined;
    this.socket = new Socket(sockerUrl);
    this.result = {};
  }

  setUrl = (from, to) =>
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${from}&tsyms=${to}`;

  deselectActiveCoin = () => (dispatch) => {
    this.socket.unsubscribe();
    dispatch(removeActiveCoin());
  };

  getStream = (result) => {
    const convertTo = result.TOSYMBOL;
    if (convertTo === 'BTC') {
      axios
        .get(this.setUrl('BTC', 'EUR'))
        .then((response) => {
          const formattedResponse = response.data.DISPLAY.BTC.EUR;
          let price = formattedResponse.PRICE;
          price = price.slice(2, price.length - 1);
          price = price.split(',').join('');
          price = parseFloat(price);
          price = parseFloat(result.PRICE * price).toFixed(4);
          const change24 = result.CHANGE24HOURPCT;
          this.result = {
            ...this.result,
            price,
            change24
          };
          this.dispatch(selectActiveCoin(this.result));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const price = result.PRICE;
      const change24 = result.CHANGE24HOURPCT;
      this.result = {
        ...this.result,
        price,
        change24
      };
      this.dispatch(selectActiveCoin(this.result));
    }
  };

  selectCoin = coin => (dispatch) => {
    this.dispatch = dispatch;
    axios
      .get(this.setUrl(coin.name, 'EUR'))
      .then((response) => {
        const formattedResponse = response.data.DISPLAY[coin.name].EUR;
        let mrkcap = formattedResponse.MKTCAP;
        mrkcap = textFormatter(mrkcap);
        const { label, image } = coin;
        this.result = {
          ...this.result,
          label,
          image,
          mrkcap
        };
        this.socket.unsubscribe();
        this.socket.subscribe(coin.name).subscribe((res) => {
          this.getStream(res);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
