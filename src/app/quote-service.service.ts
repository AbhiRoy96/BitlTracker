import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BookingTempData } from './marketData';
import { environment } from '../environments/environment';

@Injectable()
export class QuoteServiceService {

  constructor(private http: HttpClient) { }

  private apiKey = environment.internalApiKey;

  private sessionAuthentictionURI = 'http://localhost:3000/api/session';
  private countryList = 'http://localhost:3000/api/countries';
  private portList = 'http://localhost:3000/api/country/ports';
  private portNo = 'http://localhost:3000/api/ports/no';
  private quoteFCL = 'http://localhost:3000/api/quotes/fcl';
  private quoteLCL = 'http://localhost:3000/api/quotes/lcl';
  private quoteBULK = 'http://localhost:3000/api/quotes/bulk';

  private tempBooking = 'http://localhost:3000/api/bookings/temp';

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

  getPortData(token, portno) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      'port_no': portno
    };

    return this.http.post(this.portNo, httpBody, httpOptions)
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


  getTempBooking(token, bookingData: BookingTempData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      from_p: bookingData.from_p,
      to_p: bookingData.to_p,
      from_p_name: bookingData.from_p_name,
      to_p_name: bookingData.to_p_name,
      freight_services_name: bookingData.freight_services_name,
      freight_price: bookingData.freight_price,
      shipmentDate: bookingData.shipmentDate,
      freight_mode: bookingData.freight_mode,
      type: bookingData.type,
      freight_services_id: bookingData.freight_services_id,
      cont_id: bookingData.cont_id,
      cont_image: bookingData.cont_image,
      shpmt_name: bookingData.shpmt_name,
      quantity: bookingData.quantity
    };

    return this.http.post(this.tempBooking, httpBody, httpOptions)
      .map(result => result);
  }


}
