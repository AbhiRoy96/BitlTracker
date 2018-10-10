import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class QuoteServiceService {

  constructor(private http: HttpClient) { }

  private apiKey = '38f2cef0ef50ab68cc22dff0827ec61009371285b40c9d462e7ffc0561fa9391';

  private sessionAuthentictionURI = 'http://localhost:3000/api/session';
  private countryList = 'http://localhost:3000/api/countries';
  private portList = 'http://localhost:3000/api/country/ports';
  private quoteFCL = 'http://localhost:3000/api/quotes/fcl';
  private quoteLCL = 'http://localhost:3000/api/quotes/lcl';
  private quoteBULK = 'http://localhost:3000/api/quotes/bulk';

  authenticateSession() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.apiKey
      })
    };


    return this.http.post(this.sessionAuthentictionURI, '', httpOptions)
      .map(result => result);
  }


  getCountryList(api_tok) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': api_tok
      })
    };

    return this.http.get(this.countryList, httpOptions)
      .map(result => result);
  }


  getPortList(token, country) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      'country': country
    };

    return this.http.post(this.portList, httpBody, httpOptions)
      .map(result => result);
  }



  getFCLQuotes(token, fromPort, toPort, shipmentTp) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      'from_port': fromPort,
      'to_port': toPort,
      'shpmt_type': shipmentTp
    };

    return this.http.post(this.quoteFCL, httpBody, httpOptions)
      .map(result => result);

  }

  getLCLQuotes(token, fromPort, toPort, shipmentTp) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      'from_port': fromPort,
      'to_port': toPort,
      'shpmt_type': shipmentTp
    };

    return this.http.post(this.quoteLCL, httpBody, httpOptions)
      .map(result => result);

  }

  getBULKQuotes(token, fromPort, toPort, shipmentTp, grosswt) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      'from_port': fromPort,
      'to_port': toPort,
      'shpmt_type': shipmentTp,
      'gross_wt': grosswt
    };

    return this.http.post(this.quoteBULK, httpBody, httpOptions)
      .map(result => result);

  }
}
