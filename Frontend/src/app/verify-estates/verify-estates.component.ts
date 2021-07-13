import { Component, OnInit } from '@angular/core';
import { Estate } from '../data/estate';
import { User } from '../data/user';
import { EstateService } from '../services/estate.service';

@Component({
  selector: 'app-verify-estates',
  templateUrl: './verify-estates.component.html',
  styleUrls: ['./verify-estates.component.css']
})
export class VerifyEstatesComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  estates = [];
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.estateService.getUnverifiedEstates().subscribe((res: any) => {
      this.estates = res;
    });
  }

  verify(est: Estate) {
    this.estateService.verifyEstate(est._id).subscribe((res: any) => {
      if (res.status === 'OK') {
        let i = this.estates.findIndex(e => e._id === est._id);
        if (i !== -1) {
          this.estates.splice(i);
        }
      }
    });
  }


}
