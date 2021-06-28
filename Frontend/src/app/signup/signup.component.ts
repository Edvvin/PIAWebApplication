import { Component, OnInit} from '@angular/core';
import User from '../data/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,24})/;
  name: string;
  nameErr: string;
  surname: string;
  surnameErr: string;
  username: string;
  usernameErr: string;
  password: string;
  passwordErr: string;
  confirmPass: string;
  confirmPassErr: string;
  city: string;
  cityErr: string;
  country: string;
  countryErr: string;
  selectedFiles : any;

  ngOnInit(): void {
    this.selectedFiles = null;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    let temp : any = this.selectedFiles;
    if(temp.length === 0) {
      this.selectedFiles = null;
    }
    console.log(event.target.files);
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
    if(this.name===undefined || this.surname.length === 0){
      this.surnameErr = 'Surname is required';
      isBad = true;
    }
    else{
      this.surnameErr = '';
    }
    if(this.name===undefined || this.username.length === 0){
      this.usernameErr = 'username is required';
      isBad = true;
    }
    else{
      this.usernameErr = '';
    }
    if(this.name===undefined || this.city.length === 0){
      this.cityErr = 'City is required';
      isBad = true;
    }
    else{
      this.cityErr = '';
    }
    if(this.name===undefined || this.country.length === 0){
      this.countryErr = 'country is required';
      isBad = true;
    }
    else{
      this.countryErr = '';
    }
    if(!this.passwordCheck.test(this.password)){
      this.passwordErr = 'Password bad';
      isBad = true;
    }
    else{
      this.passwordErr = '';
    }
    if(this.password !== this.confirmPass){
      this.confirmPassErr = 'Does not match';
      isBad = true;
    }
    else{
      this.confirmPassErr = '';
    }

    if(isBad) {
      return;
    }

    let user = new User();
    user.name = this.name;
    user.surname = this.surname;
    user.username = this.username;
    user.city = this.city;
    user.country = this.country;
    user.password = this.password;
    user.isVerified = false;
    user.userType = 'regular';
    user.image = '';

    this.userService.register(user).subscribe((res: any) => {
      if (res.status === 'FAIL'){
        this.usernameErr = res.message;
      } else {
        if (this.selectedFiles != null) {
          const formData = new FormData();
          formData.append('file', this.selectedFiles);
          this.userService.upload(formData).subscribe((res: any) => {
            console.log(res);
            this.userService.setImage(this.username, res.filename).subscribe((rep: any) => {
              if (rep.status !== 'OK') {
                alert('image not set');
              }
            });
            },
            (err) => console.log(err)
          );
        }
      }
    });

  }

}
