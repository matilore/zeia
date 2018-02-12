import CCC from 'streamer-utils';
import openSocket from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export default class Socket {
  constructor(url) {
    this.url = url;
    this.currentPrice = {};
    this.socket = openSocket(this.url);
  }

  subscribe = (coinName) => {
    const observable = new Observable((observer) => {
      this.convertTo = ['BTC', 'EUR'].filter(convertTo => coinName !== convertTo)[0];
      this.subscription = [`5~CCCAGG~${coinName}~${this.convertTo}`];
      const self = this;
      this.socket.emit('SubAdd', { subs: this.subscription });
      this.socket.on('m', (message) => {
        const messageType = message.substring(0, message.indexOf('~'));
        let res = {};
        if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
          res = CCC.CURRENT.unpack(message);
          observer.next(self.dataUnpack(res));
        }
      });
    });
    return observable;
  };

  unsubscribe = () => {
    this.socket.emit('SubRemove', { subs: this.subscription });
  };

  dataUnpack = (data) => {
    const convertFrom = data.FROMSYMBOL;
    const convertTo = data.TOSYMBOL;
    const fsym = CCC.STATIC.CURRENCY.getSymbol(convertFrom);
    const tsym = CCC.STATIC.CURRENCY.getSymbol(convertTo);
    const pair = convertFrom + convertTo;

    if (!this.currentPrice.hasOwnProperty(pair)) {
      this.currentPrice[pair] = {};
    }

    for (const key in data) {
      this.currentPrice[pair][key] = data[key];
    }

    if (this.currentPrice[pair].LASTTRADEID) {
      this.currentPrice[pair].LASTTRADEID = parseInt(this.currentPrice[pair].LASTTRADEID).toFixed(0);
    }
    this.currentPrice[pair].CHANGE24HOUR = CCC.convertValueToDisplay(
      tsym,
      this.currentPrice[pair].PRICE - this.currentPrice[pair].OPEN24HOUR
    );
    this.currentPrice[pair].CHANGE24HOURPCT = `${(
      (this.currentPrice[pair].PRICE - this.currentPrice[pair].OPEN24HOUR) /
      this.currentPrice[pair].OPEN24HOUR *
      100
    ).toFixed(2)}%`;
    return this.currentPrice[pair];
  };
}
