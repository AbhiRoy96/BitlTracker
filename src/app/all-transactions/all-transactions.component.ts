import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { BookingServiceService } from '../booking-service.service';


@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {

  private usid: any;
  private allTzx: any;
  private getInvoice = 'http://localhost:3000/api/transaction/invoice';

  constructor(private router: Router, private bookingServ: BookingServiceService) { }

  ngOnInit() {
    if (window.localStorage.getItem('_euid') != null) {
      this.usid = window.localStorage.getItem('_euid');

      this.bookingServ.getAllTransaction(window.localStorage.getItem('_ui'))
      .subscribe(data => {
        this.allTzx = data;
      });

      window.localStorage.removeItem('_euid');
    } else {
      this.router.navigate(['signin']);
    }
  }


  generateInvoice(awb) {
    window.open(this.getInvoice + '/' + window.localStorage.getItem('_ui') + '/' + awb, 'Download Invoice', 'width=auto, height=auto');
  }

}
