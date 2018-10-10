import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

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

}

