import { Component, Input, OnInit } from '@angular/core';
import {Estate} from '../data/estate';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent implements OnInit {

  constructor( private userService: UserService, private sanitizer: DomSanitizer) {
   }

  @Input()
  estate : Estate;

  imgUrl;

  rooms : number[];

  getRandomInt(max){
    return Math.floor(Math.random() * max);
  }

  ngOnInit(): void {
    this.rooms = Array(this.estate.numberOfRooms).fill(0);

    if (this.estate.images.length > 0) {
      var file = this.estate.images[this.getRandomInt(this.estate.images.length)];
      this.userService.download(file).subscribe(
        u => {
          let url = URL.createObjectURL(u);
          this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(url);
          console.log(this.imgUrl);
        },
        error => console.error(error)
      );
    }
  }

}
