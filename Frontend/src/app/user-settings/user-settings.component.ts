import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../data/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  password: string;
  passwordErr: string;
  newpassword: string;
  newpasswordErr: string;
  confirmPass: string;
  confirmPassErr: string;
  passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,24})/;

  ngOnInit(): void {
  }

  submit () {
    let user = JSON.parse(localStorage.getItem('user'));
    let isBad = false;

    if( !this.passwordCheck.test(this.newpassword)){
      this.newpasswordErr = 'Password bad';
      isBad = true;
    }
    else{
      this.newpasswordErr = '';
    }
    if (this.newpassword !== this.confirmPass)
    {
      this.confirmPassErr = 'Does not match';
      isBad = true;
    }
    else{
      this.confirmPassErr = '';
    }

    if (isBad) {
      return;
    }

    this.userService.changePassword(user.username, this.password, this.newpassword).subscribe((res: any) => {
      if (res.status === 'OK'){
        this.passwordErr = '';
        this.router.navigate(['/']);
      }
      else{
        this.passwordErr = res.message;
      }
    });

  }

}
