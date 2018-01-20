import CCC from 'streamer-utils'
import openSocket from 'socket.io-client'

export default class Socket {
  constructor (url) {
    this.url = url
    this.currentPrice = {}
    this.socket = openSocket(this.url)
  }

    subscribe = (coinName, setResult) => {
      this.convertTo = ['BTC', 'EUR'].filter(convertTo => coinName !== convertTo)[0]
      this.subscription = [`5~CCCAGG~${coinName}~${this.convertTo}`]
      var self = this
      this.socket.emit('SubAdd', { subs: this.subscription })
      this.socket.on('m', function (message) {
        var messageType = message.substring(0, message.indexOf('~'))
        var res = {}
        if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
          res = CCC.CURRENT.unpack(message)
          self.dataUnpack(res, setResult)
        }
      })
    }

    unsubscribe = () => {
      this.socket.emit('SubRemove', { subs: this.subscription })
    }

    dataUnpack = (data, setResult) => {
      var convertFrom = data['FROMSYMBOL']
      var convertTo = data['TOSYMBOL']
      var fsym = CCC.STATIC.CURRENCY.getSymbol(convertFrom)
      var tsym = CCC.STATIC.CURRENCY.getSymbol(convertTo)
      var pair = convertFrom + convertTo

      if (!this.currentPrice.hasOwnProperty(pair)) {
        this.currentPrice[pair] = {}
      }

      for (var key in data) {
        this.currentPrice[pair][key] = data[key]
      }

      if (this.currentPrice[pair]['LASTTRADEID']) {
        this.currentPrice[pair]['LASTTRADEID'] = parseInt(this.currentPrice[pair]['LASTTRADEID']).toFixed(0)
      }
      this.currentPrice[pair]['CHANGE24HOUR'] = CCC.convertValueToDisplay(tsym, (this.currentPrice[pair]['PRICE'] - this.currentPrice[pair]['OPEN24HOUR']))
      this.currentPrice[pair]['CHANGE24HOURPCT'] = ((this.currentPrice[pair]['PRICE'] - this.currentPrice[pair]['OPEN24HOUR']) / this.currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2) + '%'
      setResult(this.currentPrice[pair], convertFrom, convertTo)
    };
}
