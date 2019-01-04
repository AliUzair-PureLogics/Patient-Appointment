import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() person;
  constructor() { }

  ngOnInit() {
    this.person = {
      username: '',
      password: ''
    };
  }

  doLogin() {
    if (!this.person.username) {
      return alert(`Please enter username`);
    }
    if (!this.person.password) {
      return alert(`Please enter password`);
    }
    alert(`Got request to login with username='${this.person.username}' and password='${this.person.password}'`);
  }

}
