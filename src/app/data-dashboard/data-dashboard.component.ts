import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/observable/interval';

import { CoinDataFetched, News, Event, Tradings } from '../marketData';
import { Chart } from 'chart.js';

import { LivedataService } from '../livedata.service';
import { SocketServiceService } from '../socket-service.service';



@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.css']
})


export class DataDashboardComponent implements OnInit, AfterViewInit {

  oldPoints: number;
  chartPoints: number;
  chart = [];
  coinbase: any;
  bitcoinData: any;
  marketPrice: any[];
  coin_images: any;
  live_coins_info: any;

  coinInfoData: CoinDataFetched[] = [];
  coinsList: any[] = [];

  ioConn: any;
  trades: Tradings[] = [];

  marketExchanges: any;
  tempNews: any;
  news: News[] = [];

  tempData: any;

  startingDate: any;
  endingDate: any;


  constructor(private coinService: LivedataService, private webSocketService: SocketServiceService) {
    this.chartPoints = 60;
    this.oldPoints = 60;
    this.exchangeRates();
    this.bitcoinDataPrice();
    this.coinImages();
    this.topCoinHunter();
    this.marketExchange();
    this.getLiveNews();
    this.initIOConn();
  }

  ngOnInit() {
      this.marketChartDisplay();
  }

  ngAfterViewInit() {
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

  chartdataData(points) {
    if (this.chartPoints === 60) {
      document.getElementById('hr1').classList.remove('chart-button-active');
    } else if (this.chartPoints === 1440) {
      document.getElementById('dy1').classList.remove('chart-button-active');
    } else if (this.chartPoints === 10080) {
      document.getElementById('we1').classList.remove('chart-button-active');
    } else if (this.chartPoints === 43200) {
      document.getElementById('mo1').classList.remove('chart-button-active');
    } else {
      document.getElementById('yr1').classList.remove('chart-button-active');
    }

    if (points === 60) {
      document.getElementById('hr1').classList.add('chart-button-active');
    } else if (points === 1440) {
      document.getElementById('dy1').classList.add('chart-button-active');
    } else if (points === 10080) {
      document.getElementById('we1').classList.add('chart-button-active');
    } else if (points === 43200) {
      document.getElementById('mo1').classList.add('chart-button-active');
    } else {
      document.getElementById('yr1').classList.add('chart-button-active');
    }
    this.oldPoints = this.chartPoints;
    this.chartPoints = points;

    console.log(this.chartPoints);
    this.updateChartData();
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

  getLiveNews() {
    this.coinService.getNewsUpdates()
      .subscribe( data => {
        this.tempNews = data;
        let ctr = 0;
        this.tempNews.Data.forEach(newsItem => {
          if (ctr < 3) {
            const newNews = new News(newsItem.source_info.name, newsItem.title, newsItem.url);
            this.news.push(newNews);
            ctr ++;
          }
        });
      });
  }


  initIOConn() {
    this.webSocketService.initSocket();
    this.webSocketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        // console.log('Connected to the server');
    });

    this.webSocketService.conn_broker()
      .subscribe(data => {
        const local_sub: any = data;

        // console.log(local_sub.USD.TRADES);

        this.webSocketService.send(local_sub.USD.TRADES);


        this.ioConn = this.webSocketService.onMessage()
          .subscribe(message => {
            if (this.trades.length > 9) {
              this.trades.shift();
            }

            const res = message.split('~');
            // tslint:disable-next-line:radix
            const d = new Date(parseInt(res[6]));
            const timeStr = d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
            // tslint:disable-next-line:radix
            const nTrade = new Tradings(timeStr, res[1], parseInt(res[4]), parseFloat(res[9]));
            this.trades.push(nTrade);




            // shorter test code


            // if (this.trades.length < 10) {
            // const res = message.split('~');
            // // tslint:disable-next-line:radix
            // const d = new Date(parseInt(res[6]));
            // const timeStr = d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds();
            // // tslint:disable-next-line:radix
            // const nTrade = new Tradings(timeStr, res[1], parseInt(res[4]), parseFloat(res[9]));
            // this.trades.push(nTrade);
            // }
          });

          // console.log(this.trades);
      });

  }


  marketChartDisplay() {

    this.coinService.dailyMarketdata(this.chartPoints.toString())
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

    this.coinService.dailyMarketdata(this.chartPoints.toString())
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
        if (this.oldPoints === this.chartPoints) {
          requestDates.forEach(element => {
            this.removeData(this.chart);
          });
        } else {
          for (let i = 0; i <= this.oldPoints; i++) {
            this.removeData(this.chart);
          }
          this.oldPoints = this.chartPoints;
        }


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

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.webSocketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        // console.log('Connected to the server');
    });
  }

}
