import { Component, Input, OnInit } from '@angular/core';
import {Estate} from '../data/estate';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../data/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estate-card',
  templateUrl: './estate-card.component.html',
  styleUrls: ['./estate-card.component.css']
})
export class EstateCardComponent implements OnInit {

  constructor( private userService: UserService, private sanitizer: DomSanitizer, private router: Router) {
   }

  @Input()
  estate : Estate;

  @Input()
  clickable: boolean;

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
        },
        error => console.error(error)
      );
    }
  }

  openCard(){
    if (!this.clickable){
      return;
    }
    let u: User = JSON.parse(localStorage.getItem('user'));
    if (u){
      this.router.navigate(['/estate', this.estate._id]);
    }
  }

}
