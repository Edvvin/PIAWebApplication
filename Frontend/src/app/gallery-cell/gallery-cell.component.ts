import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Estate } from '../data/estate';
import { User } from '../data/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-gallery-cell',
  templateUrl: './gallery-cell.component.html',
  styleUrls: ['./gallery-cell.component.css']
})


export class GalleryCellComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private router: Router) { }

  @Input()
  estate: Estate;

  user: User;

  imgUrl: any;

  getRandomInt(max){
    return Math.floor(Math.random() * max);
  }

  ngOnInit(): void {
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

  gotoEstate () {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user){
      this.router.navigate(['/estate', this.estate._id]);
    }
  }

}
