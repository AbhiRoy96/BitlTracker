import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuoteServiceService } from '../quote-service.service';
import { CoordData, BookingTempData } from '../marketData';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})


export class QuotesComponent implements OnInit {


  constructor(private quoteSer: QuoteServiceService, private router: Router) { }

  // private base_latitude = 22.5726;
  // private base_longitude = 88.3639;

  private base_latitude = 20.0;
  private base_longitude = 0.0;

  private f_lat: any;
  private f_long: any;

  private t_lat: any;
  private t_long: any;

  private coordinateData: any;



  private shipContType: any;
  private sess_data: any;
  private containerData: any;
  private countryList: any;
  private d_ports: any;
  private a_ports: any;
  private shipmentDate: any;
  private portDeparture: number;
  private portArrival: number;
  private shpType: any = [
    {
      value: '20ST',
      type: '20ft Standard'
    },
    {
      value: '40ST',
      type: '40ft Standard'
    },
    {
      value: '40HQ',
      type: '40ft High Cube'
    },
    {
      value: '20REF',
      type: '20ft Reefer'
    },
    {
      value: '40REF',
      type: '40ft Reefer'
    },
    {
      value: 'IBOX5',
      type: 'Box - 5000 Kg Pellet'
    },
    {
      value: 'IBOX7',
      type: 'Box - 7000 Kg Pellet'
    },
    {
      value: 'HNDSZ',
      type: 'Handysize Bulk Carrier'
    },
    {
      value: 'HNDMX',
      type: 'Handymax Bulk Carrier'
    },
    {
      value: 'SUPRMX',
      type: 'Supramax Bulk Carrier'
    },
    {
      value: 'ULTRMX',
      type: 'Ultramax Bulk Carrier'
    },
    {
      value: 'PNMX',
      type: 'Panamax Bulk Carrier'
    },
    {
      value: 'CPSZ',
      type: 'Capsize Bulk Carrier'
    }];
  private containerType: any;
  private grossWt: any;
  private alert_text: any;
  private reeferTrue: any;
  private bookingDat: any;


  ngOnInit() {
    window.localStorage.setItem('isPyDs', 'false');
    this.quoteSer.authenticateSession()
      .subscribe(data => {
        this.sess_data = data;
        window.localStorage.setItem('_ui', this.sess_data.session_id);

        this.quoteSer.getCountryList(window.localStorage.getItem('_ui'))
          .subscribe( cdata => {
            this.countryList = cdata;
            this.containerData = {'status': 201};
          });

      });
    document.getElementById('grssWT').style.display = 'none';
    this.reeferTrue = null;
  }

  giveFCLQuotes(fromPort, toPort, type) {
    this.quoteSer.getFCLQuotes(window.localStorage.getItem('_ui'), fromPort, toPort, type)
      .subscribe(data => {
        this.containerData = data;
          console.log(this.containerData);
          this.shipContType = 'FCL';
          this.f_setMarkers(fromPort);
          this.t_setMarkers(toPort);
      });
  }

  giveLCLQuotes(fromPort, toPort, type) {
    this.quoteSer.getLCLQuotes(window.localStorage.getItem('_ui'), fromPort, toPort, type)
      .subscribe(data => {
        this.containerData = data;
          console.log(this.containerData);
          this.shipContType = 'LCL';
          this.f_setMarkers(fromPort);
          this.t_setMarkers(toPort);
      });
  }

  giveBULKQuotes(fromPort, toPort, type, grossWt) {
    this.quoteSer.getBULKQuotes(window.localStorage.getItem('_ui'), fromPort, toPort, type, grossWt)
      .subscribe(data => {
        this.containerData = data;
          console.log(this.containerData);
          this.shipContType = 'BULK';
          this.f_setMarkers(fromPort);
          this.t_setMarkers(toPort);
      });
  }

  changeDetails(event) {
    if  (event.target.attributes.id.ownerElement.firstChild.data === 'View Details') {
      event.target.attributes.id.ownerElement.firstChild.data = 'Hide Details';
    } else {
      event.target.attributes.id.ownerElement.firstChild.data = 'View Details';
    }
  }

  getCountry_d(value) {
    this.quoteSer.getPortList(window.localStorage.getItem('_ui'), value)
      .subscribe(data => {
        this.d_ports = data;
      });
  }

  getCountry_a(value) {
    this.quoteSer.getPortList(window.localStorage.getItem('_ui'), value)
      .subscribe(data => {
        this.a_ports = data;
      });
  }

  getPorts_d(value) {
    this.portDeparture = value;
  }

  getPorts_a(value) {
    this.portArrival = value;

  }

  f_setMarkers(portNo) {

    this.quoteSer.getPortData(window.localStorage.getItem('_ui'), portNo)
      .subscribe( data => {
        this.coordinateData = data;
        this.f_lat = this.coordinateData[0].latitude;
        this.f_long = this.coordinateData[0].longitude;
      });
  }


  t_setMarkers(portNo) {

    this.quoteSer.getPortData(window.localStorage.getItem('_ui'), portNo)
      .subscribe( data => {
        this.coordinateData = data;
        this.t_lat = this.coordinateData[0].latitude;
        this.t_long = this.coordinateData[0].longitude;
      });
  }

  getContainerTypes_a(event) {
    this.containerType = event.target.value;
    this.grossWt = 1;
    if ((this.containerType === 'HNDSZ') || (this.containerType === 'HNDMX') || (this.containerType === 'SUPRMX') ||
    (this.containerType === 'ULTRMX') || (this.containerType === 'PNMX') || (this.containerType === 'CPSZ')) {
      document.getElementById('grssWT').style.display = 'block';
    } else {
      if ((this.containerType === '20REF') || (this.containerType === '40REF')) {
        document.getElementById('grssWT').style.display = 'none';
      } else {
        document.getElementById('grssWT').style.display = 'none';
      }

    }
  }

  onKey(event) {
    this.grossWt = event.target.value;
  }


  getShipmentDate(event) {
    this.shipmentDate = event.target.value;
  }


  getQuote() {

    this.f_lat = null;
    this.f_long = null;
    this.t_lat = null;
    this.t_long = null;

    if ((this.portDeparture != null) && (this.portArrival != null)) {
      if ((this.containerType === '20ST') || (this.containerType === '40ST') || (this.containerType === '40HQ') ||
      (this.containerType === '20REF') || (this.containerType === '40REF')) {

        if ((this.containerType === '20REF') || (this.containerType === '40REF')) {
          this.reeferTrue = 'reefer';
        } else {
          this.reeferTrue = null;
        }

        this.giveFCLQuotes(this.portDeparture, this.portArrival, this.containerType);
      } else if ((this.containerType === 'IBOX5') || (this.containerType === 'IBOX7')) {
        this.reeferTrue = null;

        this.giveLCLQuotes(this.portDeparture, this.portArrival, this.containerType);
      } else if ((this.containerType === 'HNDSZ') || (this.containerType === 'HNDMX') || (this.containerType === 'SUPRMX') ||
      (this.containerType === 'ULTRMX') || (this.containerType === 'PNMX') || (this.containerType === 'CPSZ')) {
        if (this.grossWt != null) {
          this.reeferTrue = null;

          this.giveBULKQuotes(this.portDeparture, this.portArrival, this.containerType, this.grossWt);
        } else {
          this.alert_text = 'Please enter the Gross Weight.';
          document.getElementById('alertModal').style.display = 'block';
        }
      } else {
        this.alert_text = 'Please select the Container Type.';
        document.getElementById('alertModal').style.display = 'block';
      }
    } else {
      if (this.portDeparture == null) {
        this.alert_text = 'Please select the Port of Origin.';
      } else {
        this.alert_text = 'Please select the Port of Discharge.';
      }
      document.getElementById('alertModal').style.display = 'block';
    }

  }

  exitModal() {
    document.getElementById('alertModal').style.display = 'none';
  }



  getBooking(carrier, from_name, to_name, carrier_name,  quote_price, cont_id, cont_image, shpmt_name) {

    // tslint:disable-next-line:max-line-length
    const booking = new BookingTempData(this.portDeparture, this.portArrival, this.shipContType, this.containerType, this.shipmentDate, quote_price, carrier, from_name, to_name, carrier_name, cont_id, cont_image, shpmt_name, this.grossWt);
    // console.log(booking);

    this.quoteSer.getTempBooking(window.localStorage.getItem('_ui'), booking)
      .subscribe(data => {
        this.bookingDat = data;
        // console.log(this.bookingDat);
      });
  }



  proceedToBook(bookingDat) {
    console.log(bookingDat);
    window.localStorage.setItem('_bt', bookingDat.booking_session);
    window.localStorage.setItem('_bid', bookingDat.booking_id);
    // for quick redressal
    this.router.navigate(['booking']);

    // document.getElementById('confirmBooking').style.display = 'none';

    // gg if no sign in.
    // if (!window.localStorage.getItem('_ur')) {
    //   this.alert_text = 'Please Sign In to continue with booking.';
    //   document.getElementById('alertModal').style.display = 'block';
    // } else {
    //   console.log('gg');
    // }
  }

}




