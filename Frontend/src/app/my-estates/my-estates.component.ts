import { Component, OnInit } from '@angular/core';
import { User } from '../data/user';
import { EstateService } from '../services/estate.service';

@Component({
  selector: 'app-my-estates',
  templateUrl: './my-estates.component.html',
  styleUrls: ['./my-estates.component.css']
})
export class MyEstatesComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  myestates;
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.estateService.myestates(this.user.username).subscribe((res: any) => {
      console.log(res);
      this.myestates = res;
    });
  }

}
