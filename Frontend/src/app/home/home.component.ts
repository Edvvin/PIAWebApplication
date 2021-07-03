import { Component, OnInit } from '@angular/core';
import { EstateService } from '../services/estate.service';
import { Estate } from '../data/estate';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private estateService: EstateService) { }
  
  estate: Estate;
  city: string;
  lower: number;
  upper: number;
  cityErr: string;
  lowerErr: string;
  upperErr: string;
  searchResults = [];

  ngOnInit(): void {
    this.estate = new Estate();
    this.estate.numberOfRooms = 4;
    this.estate.address = "Maksimaf grakdok 12a";
    this.estate.price = 3000;
  }

  search() {
    let tempC;
    let tempL;
    let tempU;
    let numOfBad = 0;
    if(this.city === undefined || this.city.length === 0){
      tempC = '';
      numOfBad++;
    }
    else{
      tempC = this.city;
    }

    if(this.lower === undefined){
      tempL = 0;
      numOfBad++;
    }
    else{
      tempL = this.lower;
    }

    if(this.upper === undefined){
      tempU = Number.MAX_VALUE;
      numOfBad++;
    }
    else{
      tempU = this.upper;
    }

    if (numOfBad === 3){
      this.cityErr = this.lowerErr = this.upperErr = 'Must insert at least one constraint';
      return;
    }
    else {
      this.cityErr = this.lowerErr = this.upperErr = '';
    }

    if (tempL > tempU){
      this.lowerErr = this.upperErr = 'Lower limit cannot be larger than upper';
      return;
    }
    else{
      this.lowerErr = this.upperErr = '';
    }

    this.estateService.estateSearch(tempC, tempL, tempU).subscribe((res: any) => {
      if(res.status === "OK"){
        this.searchResults = res.estates;
      }
    });
  }

}
