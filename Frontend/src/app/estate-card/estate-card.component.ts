import { Component, Input, OnInit } from '@angular/core';
import {Estate} from '../data/estate';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent implements OnInit {

  constructor() {
   }

  @Input()
  estate : Estate;

  rooms : number[];

  ngOnInit(): void {
    this.rooms = Array(this.estate.numberOfRooms).fill(0);
  }

}
