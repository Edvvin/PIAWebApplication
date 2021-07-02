import { Component, OnInit } from '@angular/core';
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

  constructor( private estateService: EstateService, private userService: UserService) { }

  selectedFiles = [];

  fileSelectErrMsg: string;
  description: string;
  descriptionErr:string;
  country: string;
  countryErr: string;
  city: string;
  cityErr: string;
  address: string;
  addressErr: string;
  estateType: string;
  flatFloor: number;
  flatFloorErr: string;
  area: number;
  areaErr: string;
  numOfFloors: number;
  numOfFloorsErr: string;
  numOfRooms: number;
  numOfRoomsErr: string;
  isFurnished: boolean;
  isForSale: boolean;
  price: number;
  priceErr: string;


  ngOnInit(): void {
  }

  radioBtn(val){
    this.estateType = val;
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

    if(this.city===undefined || this.city.length === 0){
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

    if(this.area===undefined){
      this.areaErr = 'Area is required';
      isBad = true;
    }
    else{
      this.areaErr = '';
    }

    if(this.price===undefined){
      this.priceErr = 'Price is required';
      isBad = true;
    }
    else{
      this.priceErr = '';
    }

    if(this.numOfFloors===undefined){
      this.numOfFloorsErr = 'Required';
      isBad = true;
    }
    else{
      this.numOfFloorsErr = '';
    }

    if(this.numOfRooms===undefined){
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
    estate.description = this.description;
    estate.country = this.country;
    estate.city = this.city;
    estate.address = this.address;
    estate.isHouse = (this.estateType === 'house');
    estate.floorOfAparment = this.flatFloor;
    estate.area = this.area;
    estate.numberOfFloors = this.numOfFloors;
    estate.numberOfRooms = this.numOfRooms;
    estate.isFurnished = this.isFurnished;
    estate.isForSale = this.isForSale;
    estate.price = this.price;
    estate.isPromoted = false;
    
    let user: User = JSON.parse(localStorage.getItem('user'));

    if(user.userType === 'agent'){
      estate.agency = user.agencyName;
      estate.owner = '';
      estate.ownedByAgency = true;
    }
    else{
      estate.agency = '';
      estate.owner = user.username;
      estate.ownedByAgency = false;
    }

    estate.images = [];

    this.estateService.addEstate(estate).subscribe((res: any) => {
      if (res.status === 'FAIL'){
      } else {
        this.selectedFiles.forEach((f) => {
          const formData = new FormData();
          formData.append('file', f);
          this.userService.upload(formData).subscribe((res: any) => {
            console.log(res);
            this.estateService.addImage(estate._id, res.filename).subscribe((rep: any) => {
              if (rep.status !== 'OK') {
                alert('image not set');
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
