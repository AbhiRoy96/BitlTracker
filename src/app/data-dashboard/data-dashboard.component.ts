import { Component, OnInit, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';

import { CoinDataFetched, News } from '../marketData';
import { Chart } from 'chart.js';
import { LivedataService } from '../livedata.service';


@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.css']
})


export class DataDashboardComponent implements OnInit, AfterViewInit {

  chart = [];
  coinbase: any;
  bitcoinData: any;
  marketPrice: any[];
  coin_images: any;
  live_coins_info: any;

  coinInfoData: CoinDataFetched[] = [];
  coinsList: any[] = [];

  marketExchanges: any;
  tempNews: any;
  news: News[] = [];

  tempData: any;

  startingDate: any;
  endingDate: any;


  constructor(private coinService: LivedataService) {

    // this.coinInfo = new CoinDataFetched();
    this.exchangeRates();
    this.bitcoinDataPrice();
    this.coinImages();
    this.topCoinHunter();
    this.marketExchange();
  }

  ngOnInit() {
      this.marketChartDisplay();
  }

  ngAfterViewInit() {
    // this.getLiveNews();

    interval(2000 * 60).subscribe(x => {
      this.updateChartData();
    });

    interval(1000 * 60).subscribe(x => {
      this.bitcoinDataPrice();
      this.exchangeRates();
      this.topCoinHunterUpdater(this.coinsList);
      this.marketExchange();
    });
  }


  exchangeRates() {
    this.coinService.getMarketData()
      .subscribe(data => {
        this.coinbase = data;
      });
  }


  bitcoinDataPrice() {
    this.coinService.bitcoinData()
      .subscribe(data => {
        this.bitcoinData = data;
      });
  }

  coinImages() {
    this.coinService.coinDetails()
      .subscribe(data => {
        this.coin_images = data;
      });
  }


  topCoinHunter() {
    this.coinService.topCoinDetails()
      .subscribe(data => {
        this.tempData = data;


        let ctr = 0;
        this.tempData.Data.forEach(coinInfoData => {
          if (ctr < 10) {
            this.coinsList.push(coinInfoData.CoinInfo.Name);
            const dataBroker = new CoinDataFetched(coinInfoData.CoinInfo.Name, coinInfoData.CoinInfo.ImageUrl);
            this.coinInfoData.push(dataBroker);
            ctr ++;
          }
        });

        this.coinService.getCoinQuote(this.coinsList.toString())
          .subscribe(coinss => {
            this.live_coins_info = coinss;
            this.coinInfoData.forEach(coin_update => {

              coin_update.price = this.live_coins_info.DISPLAY[coin_update.name].USD.PRICE;
              coin_update.change24H = this.live_coins_info.DISPLAY[coin_update.name].USD.CHANGEPCT24HOUR;


              if (this.live_coins_info.RAW[coin_update.name].USD.CHANGEPCT24HOUR >= 0) {
                coin_update.trend = 1;
              } else {
                coin_update.trend = 0;
              }
            });
          });

      });

  }

  topCoinHunterUpdater(coinsList) {
    this.coinService.getCoinQuote(coinsList.toString())
      .subscribe(coinss => {
        this.live_coins_info = coinss;
        this.coinInfoData.forEach(coin_update => {

          coin_update.price = this.live_coins_info.DISPLAY[coin_update.name].USD.PRICE;
          coin_update.change24H = this.live_coins_info.DISPLAY[coin_update.name].USD.CHANGEPCT24HOUR;


          if (this.live_coins_info.RAW[coin_update.name].USD.CHANGEPCT24HOUR >= 0) {
            coin_update.trend = 1;
          } else {
            coin_update.trend = 0;
          }
        });
      });
  }


  marketExchange() {
    this.coinService.getExchangeData()
      .subscribe( data => {
        this.marketExchanges = data;
      });
  }

  // getLiveNews() {
  //   this.coinService.getNewsUpdates()
  //     .subscribe( data => {
  //       this.tempNews = data;
  //       let ctr = 0;
  //       this.tempNews.results.forEach(newsItem => {
  //         if (ctr < 3) {
  //           const newNews = new News(newsItem.source.title, newsItem.title, newsItem.url);
  //           this.news.push(newNews);
  //           ctr ++;
  //         }
  //       });
  //       console.log(this.news);
  //     });
  // }


  marketChartDisplay() {

    this.coinService.dailyMarketdata()
      .subscribe(res => {

        // tslint:disable-next-line:prefer-const
        let closePrice = res['Data']
          // tslint:disable-next-line:no-shadowed-variable
          .map(res => res.close);

          // tslint:disable-next-line:prefer-const
        let dateStamp = res['Data']
          // tslint:disable-next-line:no-shadowed-variable
          .map(res => res.time);

        this.startingDate = new Date(dateStamp[0] * 1000).toString();
        this.endingDate = new Date(dateStamp[dateStamp.length - 1] * 1000).toString();



        // tslint:disable-next-line:prefer-const
        let requestDates = [];
        dateStamp.forEach((dt) => {
              // tslint:disable-next-line:prefer-const
              // let jsdate = new Date(dt * 1000).toLocaleTimeString();

              // tslint:disable-next-line:prefer-const
              let newjsDate: any;
              // tslint:disable-next-line:prefer-const
              let hour = new Date(dt * 1000).getUTCHours();
              if (hour < 10) {
                newjsDate = '0' + hour.toString();
              } else {
                newjsDate = hour.toString();
              }

              // tslint:disable-next-line:prefer-const
              let minute = new Date(dt * 1000).getUTCMinutes();
              if (minute < 10) {
                newjsDate = newjsDate + ':' + '0' + minute.toString();
              } else {
                newjsDate = newjsDate + ':' + minute.toString();
              }

              requestDates.push(newjsDate);
        });


        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: requestDates,
            datasets: [
              {
                data: closePrice,
                borderColor: '#26B0DE',
                borderWidth: 1,
                backgroundColor: [
                  'rgba(38, 176, 222, 0.1)'
                ],
                pointRadius: 0,
                pointHitRadius: 15,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
              line: {
                tension: 0, // disables bezier curves
              }
            },
            legend: {
              display: false,
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                    // tslint:disable-next-line:quotemark
                    fontFamily: "Montserrat",
                    autoSkip: true,
                    maxTicksLimit: 12,
                    maxRotation: 0
                },
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  // tslint:disable-next-line:quotemark
                  fontFamily: "Montserrat",
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return '$' + value;
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'PRICE IN USD',
                  // tslint:disable-next-line:quotemark
                  fontFamily: "Montserrat"
                },
                gridLines: {
                  display: false
                }

              }],
            }
          }
        });

        // end of chart styles.
      });
  }


  updateChartData() {

    this.coinService.dailyMarketdata()
      .subscribe(res => {

        // tslint:disable-next-line:prefer-const
        let closePrice = res['Data']
          // tslint:disable-next-line:no-shadowed-variable
          .map(res => res.close);

          // tslint:disable-next-line:prefer-const
        let dateStamp = res['Data']
          // tslint:disable-next-line:no-shadowed-variable
          .map(res => res.time);

        this.startingDate = new Date(dateStamp[0] * 1000).toString();
        this.endingDate = new Date(dateStamp[dateStamp.length - 1] * 1000).toString();



        // tslint:disable-next-line:prefer-const
        let requestDates = [];
        dateStamp.forEach((dt) => {
              // tslint:disable-next-line:prefer-const
              // let jsdate = new Date(dt * 1000).toLocaleTimeString();

              // tslint:disable-next-line:prefer-const
              let newjsDate: any;
              // tslint:disable-next-line:prefer-const
              let hour = new Date(dt * 1000).getUTCHours();
              if (hour < 10) {
                newjsDate = '0' + hour.toString();
              } else {
                newjsDate = hour.toString();
              }

              // tslint:disable-next-line:prefer-const
              let minute = new Date(dt * 1000).getUTCMinutes();
              if (minute < 10) {
                newjsDate = newjsDate + ':' + '0' + minute.toString();
              } else {
                newjsDate = newjsDate + ':' + minute.toString();
              }

              requestDates.push(newjsDate);
        });

        // Redrawing the Chart
        requestDates.forEach(element => {
          this.removeData(this.chart);
        });

        let item = 0;
        for (item = 0; item < requestDates.length; item++) {
          this.addData(this.chart, requestDates[item], closePrice[item]);
        }

      // end of chart styles.
      });
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset) => {
          dataset.data.pop();
      });
      chart.update();
  }

}
