import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { BookingServiceService } from '../booking-service.service';
import { BookingData } from '../marketData';
import { environment } from '../../environments/environment';

const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private bookingServ: BookingServiceService, private router: Router) { }

  private shipmentData: any;
  private awb: any;
  private f_name: any;
  private l_name: any;
  private tele: any;
  private mail: any;
  private addr: any;
  private cpay_addr: any;
  private url: any;
  private planDisabled: any;
  public merchantAddress = environment.merchantEthereumAddress;

  private newShipmentData: any;


  ngOnInit() {
    this.planDisabled = window.localStorage.getItem('isPyDs');
    console.log(this.planDisabled);
    this.bookingServ.getTempBookingVerified(window.localStorage.getItem('_ui'))
    .subscribe(data => {
      this.shipmentData = data;
      this.awb = window.localStorage.getItem('_bid');
      console.log(this.shipmentData);
    });
  }


  getFName(event) {
    this.f_name = event.target.value;
  }

  getLName(event) {
    this.l_name  = event.target.value;
  }

  getTele(event) {
    this.tele  = event.target.value;
  }

  getMail(event) {
    this.mail  = event.target.value;
  }

  getAddr(event) {
    this.addr  = event.target.value;
  }

  getUUID(event) {
    this.cpay_addr  = event.target.value;
  }


  createNewBooking() {
    // tslint:disable-next-line:max-line-length
    if (this.f_name !== '' && this.f_name != null && this.l_name !== '' && this.l_name != null && this.tele !== '' && this.tele != null && this.mail !== '' && this.mail != null && this.addr !== '' && this.addr != null && this.cpay_addr !== '' && this.cpay_addr != null) {
      // tslint:disable-next-line:max-line-length
      const bk1 = new BookingData(this.shipmentData.booking_id, this.shipmentData.service_id, this.awb, this.shipmentData.from_port, this.shipmentData.to_port, this.shipmentData.from_port_name, this.shipmentData.to_port_name, this.shipmentData.freight_services_name, this.shipmentData.freight_mode, this.shipmentData.freight_services_id, this.shipmentData.shpmt_type, this.shipmentData.shpmt_name, this.shipmentData.cont_id, this.shipmentData.date, this.shipmentData.quantity, this.shipmentData.quote_price, this.f_name, this.l_name, this.tele, this.mail, this.addr, this.cpay_addr);
      // calling the new booking function.
      this.bookingServ.getFinslBooking(window.localStorage.getItem('_ui'), bk1)
      .subscribe(data => {
        this.newShipmentData = data;
        // console.log(this.newShipmentData);
        if (this.newShipmentData.status === 200) {
          // call the generate payout.
          this.bookingServ.generateBooking(this.newShipmentData.xprs_tk)
          .subscribe(data_ => {
            this.url = data_;
            window.localStorage.setItem('isPyDs', 'true');
            this.planDisabled = window.localStorage.getItem('isPyDs');
            // disable this button
            document.getElementById('patyi').style.visibility = 'hidden';
            window.open(this.url.payment_url, 'Payment Gateway', 'width=1050, height=422');
            window.localStorage.removeItem('_bt');
            // console.log(this.url.payment_url);
          });
        } else {
          this.router.navigate(['']);
        }
      });
      // end of if
    } else {
      // opening modal for error
      document.getElementById('error-b').style.display = 'block';

    }
  }

  exitModal() {
    document.getElementById('error-b').style.display = 'none';
  }


}
