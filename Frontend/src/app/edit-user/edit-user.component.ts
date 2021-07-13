import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../data/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,24})/;
  name: string;
  nameErr: string;
  surname: string;
  surnameErr: string;
  city: string;
  cityErr: string;
  country: string;
  countryErr: string;
  user: User;
  editUser: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe(params => {
      let username = params.username;
      if(this.user.userType !== 'admin' && this.user.username !== username){
        this.router.navigate(['']);
        return;
      }
      this.userService.getUser(username).subscribe((usr: User) => {
        if (usr) {
          this.name = usr.name;
          this.surname = usr.surname;
          this.city = usr.city;
          this.country = usr.country;
        }
      });
    });
  }

  signup(){
    let isBad = false;
    if(this.name===undefined || this.name.length === 0){
      this.nameErr = 'Name is required';
      isBad = true;
    }
    else{
      this.nameErr = '';
    }
    if(this.name === "admin"){
      this.nameErr = 'user cannot be called admin';
      isBad = true;
    }
    if(this.surname===undefined || this.surname.length === 0){
      this.surnameErr = 'Surname is required';
      isBad = true;
    }
    else{
      this.surnameErr = '';
    }
    if(this.city===undefined || this.city.length === 0){
      this.cityErr = 'City is required';
      isBad = true;
    }
    else{
      this.cityErr = '';
    }
    if(this.country===undefined || this.country.length === 0){
      this.countryErr = 'country is required';
      isBad = true;
    }
    else{
      this.countryErr = '';
    }
    if (isBad) {
      return;
    }

    let user = new User();
    user.name = this.name;
    user.surname = this.surname;
    user.city = this.city;
    user.country = this.country;
    this.activatedRoute.params.subscribe(params => {
      let username = params.username;
      this.userService.editUser(username, user).subscribe((res: any) => {
        if (res.status === 'OK') {
          if(this.user.userType === 'admin' && username !== this.user.username){
            this.router.navigate(['allusers']);
          }
          else {
            this.router.navigate(['']);
          }
        }
      });
    });


  }

}
