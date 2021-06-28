import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {UserService} from '../services/user.service';
import User from '../data/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }
  
  username : string;
  password: string;
  loginError: boolean;
  loginErrorMessage: string;

  ngOnInit(): void {
    this.loginError = false;
  }

  login(){
    this.userService.login(this.username, this.password).subscribe((res: any)=>{
      if(res.status === "OK"){
        let user : User = res.user;
        localStorage.setItem('user', JSON.stringify(user));
        this.loginError = false;
        this.loginErrorMessage = "";
        this.router.navigate(['/home']);
      }
      else{
        this.loginError = true;
        this.loginErrorMessage = res.message;
      }
    });
  }

}
