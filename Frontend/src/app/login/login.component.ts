import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  
  username : string;
  password: string;
  userType: boolean;

  ngOnInit(): void {
    this.username = "user";
    this.password = "user";
    this.userType = true;
  }

}
