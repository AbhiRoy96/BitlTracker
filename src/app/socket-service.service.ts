import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';


import { Event } from './marketData';


const SERVER_URL = 'https://streamer.cryptocompare.com/';
const DATA_URL = 'https://min-api.cryptocompare.com/data/subs?fsym=BTC&tsyms=USD';



@Injectable()
export class SocketServiceService {

  private socket;

  constructor(private http: HttpClient) {}

  conn_broker() {
    return this.http.get(DATA_URL)
      .map(result => result);
  }


  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message) {
    this.socket.emit('SubAdd', { subs: message });
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('m', (data: any) => {

          observer.next(data);
        });
    });
}

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next());
    });
  }

}
