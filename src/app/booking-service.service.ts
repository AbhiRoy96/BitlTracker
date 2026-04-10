import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { BookingData } from './marketData';
import { environment } from '../environments/environment';

@Injectable()
export class BookingServiceService {

  constructor(private http: HttpClient) { }

  private apiKey = environment.internalApiKey;

  private sessionAuthentictionURI = 'http://localhost:3000/api/session';
  private tempBookingVerify = 'http://localhost:3000/api/bookings/temp/verify';
  private createNewShipment = 'http://localhost:3000/api/create/newShipment';
  private allTxnns = 'http://localhost:3000/api/transaction';


  private generatePayout = 'http://localhost:3002/generate/payout';


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




  getTempBookingVerified(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      _bt: window.localStorage.getItem('_bt'),
    };
    return this.http.post(this.tempBookingVerify, httpBody, httpOptions)
      .map(result => result);
  }





  getFinslBooking(token, booking_data: BookingData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const booking_obj = {

      booking_id: booking_data.booking_id ,
      service_id: booking_data.service_id ,
      awb: booking_data.awb ,
      from_p: booking_data.from_p ,
      to_p: booking_data.to_p ,
      from_p_name: booking_data.from_p_name ,
      to_p_name: booking_data.to_p_name ,
      freight_services_name: booking_data.freight_services_name ,
      freight_price: booking_data.freight_price ,
      freight_mode: booking_data.freight_mode ,
      freight_services_id: booking_data.freight_services_id ,
      shipment_type: booking_data.shipment_type ,
      shpmt_name: booking_data.shpmt_name ,
      cont_id: booking_data.cont_id ,
      shipmentDate: booking_data.shipmentDate ,
      quantity: booking_data.quantity ,
      quote_price: booking_data.quote_price ,
      first_name: booking_data.first_name ,
      last_name: booking_data.last_name ,
      telephone: booking_data.telephone ,
      email: booking_data.email ,
      address: booking_data.address ,
      client_payment_address: booking_data.client_payment_address

    };

    const httpBody = {
      _booking: booking_obj
    };

    return this.http.post(this.createNewShipment, httpBody, httpOptions)
      .map(result => result);
  }



  generateBooking(xprs) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    const httpBody = {
      xprs: xprs
    };
    return this.http.post(this.generatePayout, httpBody, httpOptions)
      .map(result => result);
  }


  getAllTransaction(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const httpBody = {
      _euid: window.localStorage.getItem('_euid'),
    };
    return this.http.post(this.allTxnns, httpBody, httpOptions)
      .map(result => result);
  }






}
