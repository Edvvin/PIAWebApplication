import { Component, OnInit } from '@angular/core';
import { Estate } from '../data/estate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  
  estate : Estate;

  ngOnInit(): void {
    this.estate = new Estate();
    this.estate.numberOfRooms=4;
    this.estate.address = "Maksimaf grakdok 12a";
    this.estate.price = 3000;
  }

}
