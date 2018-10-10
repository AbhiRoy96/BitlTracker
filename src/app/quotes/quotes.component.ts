import { Component, OnInit } from '@angular/core';

import { QuoteServiceService } from '../quote-service.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})


export class QuotesComponent implements OnInit {


  constructor(private quoteSer: QuoteServiceService) { }

  private sess_data: any;
  private containerData: any;
  private countryList: any;
  private d_ports: any;
  private a_ports: any;
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


  ngOnInit() {
    this.quoteSer.authenticateSession()
      .subscribe(data => {
        this.sess_data = data;
        window.localStorage.setItem('_ui', this.sess_data.session_id);

        this.quoteSer.getCountryList(window.localStorage.getItem('_ui'))
          .subscribe( cdata => {
            this.countryList = cdata;
          });

      });
    document.getElementById('grssWT').style.display = 'none';

  }

  giveFCLQuotes(fromPort, toPort, type) {
    this.quoteSer.getFCLQuotes(window.localStorage.getItem('_ui'), fromPort, toPort, type)
      .subscribe(data => {
        this.containerData = data;
          console.log(this.containerData);
      });
  }

  giveLCLQuotes(fromPort, toPort, type) {
    this.quoteSer.getLCLQuotes(window.localStorage.getItem('_ui'), fromPort, toPort, type)
      .subscribe(data => {
        this.containerData = data;
          console.log(this.containerData);
      });
  }

  giveBULKQuotes(fromPort, toPort, type, grossWt) {
    this.quoteSer.getBULKQuotes(window.localStorage.getItem('_ui'), fromPort, toPort, type, grossWt)
      .subscribe(data => {
        this.containerData = data;
          console.log(this.containerData);
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

  getContainerTypes_a(event) {
    this.containerType = event.target.value;

    if ((this.containerType === 'HNDSZ') || (this.containerType === 'HNDMX') || (this.containerType === 'SUPRMX') ||
    (this.containerType === 'ULTRMX') || (this.containerType === 'PNMX') || (this.containerType === 'CPSZ')) {
      document.getElementById('grssWT').style.display = 'block';
    } else {
      document.getElementById('grssWT').style.display = 'none';
    }
  }

  onKey(event) {
    this.grossWt = event.target.value;
  }

  getQuote() {

    console.log(this.portDeparture);
    if ((this.portDeparture != null) && (this.portArrival != null)) {
      if ((this.containerType === '20ST') || (this.containerType === '40ST') || (this.containerType === '40HQ') ||
      (this.containerType === '20REF') || (this.containerType === '40REF')) {
        this.giveFCLQuotes(this.portDeparture, this.portArrival, this.containerType);
      } else if ((this.containerType === 'IBOX5') || (this.containerType === 'IBOX7')) {
        this.giveLCLQuotes(this.portDeparture, this.portArrival, this.containerType);
      } else if ((this.containerType === 'HNDSZ') || (this.containerType === 'HNDMX') || (this.containerType === 'SUPRMX') ||
      (this.containerType === 'ULTRMX') || (this.containerType === 'PNMX') || (this.containerType === 'CPSZ')) {
        if (this.grossWt != null) {
          this.giveBULKQuotes(this.portDeparture, this.portArrival, this.containerType, this.grossWt);
        } else {
          this.alert_text = 'Please enter the Gross Weight.';
          document.getElementById('myModal').style.display = 'block';
        }
      } else {
        this.alert_text = 'Please select the Container Type.';
        document.getElementById('myModal').style.display = 'block';
      }
    } else {
      if (this.portDeparture == null) {
        this.alert_text = 'Please select the Port of Origin.';
      } else {
        this.alert_text = 'Please select the Port of Discharge.';
      }
      document.getElementById('myModal').style.display = 'block';
    }

  }

  exitModal() {
    document.getElementById('myModal').style.display = 'none';
  }









}




