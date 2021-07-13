import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../data/estate';
import { User } from '../data/user';
import { EstateService } from '../services/estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-estate',
  templateUrl: './new-estate.component.html',
  styleUrls: ['./new-estate.component.css']
})
export class NewEstateComponent implements OnInit {

  constructor( private estateService: EstateService, private userService: UserService, private router: Router) { }

  selectedFiles = [];

  fileSelectErrMsg: string;
  name: string;
  nameErr: string;
  description: string;
  descriptionErr: string;
  country: string;
  countryErr: string;
  city: string;
  cityErr: string;
  address: string;
  addressErr: string;
  flatFloor: number;
  flatFloorErr: string;
  isHouse = true;
  area: number;
  areaErr: string;
  numOfFloors: number;
  numOfFloorsErr: string;
  numOfRooms: number;
  numOfRoomsErr: string;
  isFurnished = true;
  isForSale = true;
  price: number;
  priceErr: string;


  ngOnInit(): void {
  }

  setIsHouse(b){
    this.isHouse = b;
  }

  setForSale(b){
    this.isForSale = b;
  }

  setFurnished(b){
    this.isFurnished = b;
  }

  selectFile(event) {
    let temp = event.target.files;
    if (temp.length > 0) {
      this.selectedFiles.push(temp);
    }
    console.log(this.selectedFiles);
  }

  removeFile(f) {
    var index = this.selectedFiles.indexOf(f);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  submit(){
    let isBad = false;
    if(this.name === undefined || this.name.length === 0){
      this.nameErr = 'Name is required';
      isBad = true;
    }
    else{
      this.descriptionErr = '';
    }
    if(this.description === undefined || this.description.length === 0){
      this.descriptionErr = 'Description is required';
      isBad = true;
    }
    else{
      this.descriptionErr = '';
    }
    if(this.country===undefined || this.country.length === 0){
      this.countryErr = 'Country is required';
      isBad = true;
    }
    else{
      this.countryErr = '';
    }

    if(this.city === undefined || this.city.length === 0){
      this.cityErr = 'City is required';
      isBad = true;
    }
    else{
      this.cityErr = '';
    }

    if(this.address===undefined || this.address.length === 0){
      this.addressErr = 'Address is required';
      isBad = true;
    }
    else{
      this.addressErr = '';
    }

    if(this.area===undefined || this.area === null){
      this.areaErr = 'Area is required';
      isBad = true;
    }
    else{
      this.areaErr = '';
    }

    if(this.price===undefined || this.price === null){
      this.priceErr = 'Price is required';
      isBad = true;
    }
    else{
      this.priceErr = '';
    }

    if(this.numOfFloors===undefined || this.numOfFloors === null){
      this.numOfFloorsErr = 'Required';
      isBad = true;
    }
    else{
      this.numOfFloorsErr = '';
    }

    if(this.numOfRooms===undefined || this.numOfRooms === null){
      this.numOfRoomsErr = 'Required';
      isBad = true;
    }
    else{
      this.numOfRoomsErr = '';
    }

    if(this.selectedFiles.length < 3){
      this.fileSelectErrMsg = 'You must upload at least 3 images';
      isBad = true;
    }
    else{
      this.fileSelectErrMsg = '';
    }

    if(isBad) {
      return;
    }

    let estate = new Estate;
    estate.name = this.name;
    estate.description = this.description;
    estate.country = this.country;
    estate.city = this.city;
    estate.address = this.address;
    estate.isHouse = this.isHouse;
    estate.floorOfAparment = this.flatFloor;
    estate.area = this.area;
    estate.numberOfFloors = this.numOfFloors;
    estate.numberOfRooms = this.numOfRooms;
    estate.isFurnished = this.isFurnished;
    estate.isForSale = this.isForSale;
    estate.price = this.price;
    estate.isVerified = false;
    estate.isPromoted = false;
    estate.sold = null;
    estate.isSold = false;
    estate.chats = [];
    estate.occupied = [];

    let user: User = JSON.parse(localStorage.getItem('user'));

    if (user.userType !== 'regular'){
      estate.owner = '';
      estate.ownedByAgency = true;
    }
    else{
      estate.owner = user.username;
      estate.ownedByAgency = false;
    }

    estate.images = [];

    this.estateService.addEstate(estate).subscribe((res: any) => {
      if (res.status === 'FAIL'){
      } else {
        this.selectedFiles.forEach((f) => {
          const formData = new FormData();
          formData.append('file', f[0]);
          let estid = res.estateid;
          this.userService.upload(formData).subscribe((res: any) => {
            console.log(res);
            this.estateService.addImage(estid, res.filename).subscribe((rep: any) => {
              if (rep.status !== 'OK') {
                alert('image not set');
              }
              else{
                this.router.navigate(['']);
              }
            });
            },
            (err) => console.log(err)
          );
        });
      }
    });


  }

}
