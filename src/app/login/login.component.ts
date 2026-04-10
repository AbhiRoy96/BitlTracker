import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  private userId: any;

  ngOnInit() {
  }

  focusUser() {
    document.getElementById('user').classList.add('show-border');
    document.getElementById('user-field').classList.add('show-border');
  }


  focusOutUser() {
    document.getElementById('user').classList.remove('show-border');
    document.getElementById('user-field').classList.remove('show-border');
  }


  focusPassword() {
    document.getElementById('password').classList.add('show-border');
    document.getElementById('password-field').classList.add('show-border');
  }


  focusOutPassword() {
    document.getElementById('password').classList.remove('show-border');
    document.getElementById('password-field').classList.remove('show-border');
  }

  getUSID(event) {
    this.userId = event.target.value;
  }

  loginUser() {
    if ((this.userId !== '') && (EMAIL_REGEX.test(this.userId) === true) && (this.userId != null)) {
      window.localStorage.setItem('_euid', this.userId);
      this.router.navigate(['transactions']);
    }
  }

}

