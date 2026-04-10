import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MarketData} from './marketData';



@Injectable()
export class LivedataService {


  constructor(private http: HttpClient) { }
  private _url = 'https://blockchain.info/ticker';
  private marketPriceURL = 'https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=';
  private _btcPriceDataURL = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,EOS,XLM,LTC,ADA&tsyms=USD';
  private _coinDetailsURL = 'https://min-api.cryptocompare.com/data/all/coinlist';
  private _topCoins = 'https://min-api.cryptocompare.com/data/top/totalvol?limit=50&tsym=USD';
  private _exchange = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BTC&tsym=USD&limit=10';
  private _news = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';

  getMarketData(): Observable<MarketData> {
    return this.http.get<MarketData>(this._url);
  }

  dailyMarketdata(points) {
    return this.http.get(this.marketPriceURL + points)
      .map(result => result);
  }

  bitcoinData() {
    return this.http.get(this._btcPriceDataURL)
      .map(result => result);
  }

  coinDetails() {
    return this.http.get(this._coinDetailsURL)
      .map(result => result);
  }

  topCoinDetails() {
    return this.http.get(this._topCoins)
      .map(result => result);
  }

  getCoinQuote(coins) {
    return this.http.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + coins + '&tsyms=USD')
      .map(result => result);
  }

  getExchangeData() {
    return this.http.get(this._exchange)
      .map(result => result);
  }

  getNewsUpdates() {
    return this.http.get(this._news)
      .map(result => result);
  }
}
