import { Component, OnInit } from '@angular/core';
import { EstateService } from '../services/estate.service';

@Component({
  selector: 'app-setpercent',
  templateUrl: './setpercent.component.html',
  styleUrls: ['./setpercent.component.css']
})
export class SetpercentComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  percent: number;
  err: string;

  ngOnInit(): void {
  }

  setpercent() {
    if (!this.percent) {
      this.err = 'Field required';
      return;
    }
    if (this.percent < 0 || this.percent > 100) {
      this.err = 'Invalid value';
      return;
    }
    this.err = '';
    this.estateService.setPercent(this.percent).subscribe((res: any) => {
      if (res.status === 'OK') {

      }
    });
  }

}
