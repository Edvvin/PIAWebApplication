import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EstateService } from '../services/estate.service';
import { Estate } from '../data/estate';
import * as c3 from 'c3';
import { User } from '../data/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private estateService: EstateService, private userService: UserService) { }

  estate: Estate;
  user: User;
  city: string;
  lower: number;
  upper: number;
  cityErr: string;
  lowerErr: string;
  upperErr: string;
  searchResults = [];
  promotedResults = [];
  showCharts = false;

  ngAfterViewInit() {
    this.estateService.getAllEstates().subscribe((res: any) => {
      let cities = [];
      let city_cnt: any = ['cities'];
      let pr_rent = [];
      let pr_rent_cnt: any = ['For rent'];
      let pr_sell = [];
      let pr_sell_cnt: any = ['For sale'];
      let types = ['House', 'Flat'];
      let types_cnt: any = [['For sale', 0, 0], ['For rent', 0, 0]];
      res.forEach((est: Estate) => {
        let cityInd = cities.findIndex((c => c === est.city));
        if (cityInd !== -1) {
          city_cnt[cityInd]++;
        } else {
          cities.push(est.city);
          city_cnt.push(0);
        }
        if (est.isForSale) {
          let temp = (Math.floor(est.price / 1000.0) * 1000);
          let pr = temp.toString() + '-' + (temp + 1000).toString();
          let ind = pr_sell.findIndex((c => c === pr));
          if (ind !== -1) {
            pr_sell_cnt[ind]++;
          }
          else {
            pr_sell.push(pr);
            pr_sell_cnt.push(0);
          }
          if (est.isHouse) {
            types_cnt[0][0]++;
          }
          else {
            types_cnt[0][1]++;
          }
        }
        else {
          let temp = (Math.floor(est.price / 1000.0) * 1000);
          let pr = temp.toString() + '-' + (temp + 1000).toString();
          let ind = pr_rent.findIndex((c => c === pr));
          if (ind !== -1) {
            pr_rent_cnt[ind]++;
          }
          else {
            pr_rent.push(pr);
            pr_rent_cnt.push(0);
          }
          if (est.isHouse) {
            types_cnt[1][0]++;
          }
          else {
            types_cnt[1][1]++;
          }
        }
      });
      let cities_chart = c3.generate({
        bindto: '#cities_chart',
        data: {
          columns: [city_cnt],
          type: 'bar',
        },
        axis: {
          x: {
            type: 'category',
            categories: cities,
          }
        },
        bar: {
          width: {
            ratio: 0.5,
          }
        }
      });
      let pr_rent_chart = c3.generate({
        bindto: '#pr_rent_chart',
        data: {
          columns: [pr_rent_cnt],
          type: 'bar',
        },
        axis: {
          x: {
            type: 'category',
            categories: pr_rent,
          }
        },
        bar: {
          width: {
            ratio: 0.5,
          }
        }
      });
      let pr_sell_chart = c3.generate({
        bindto: '#pr_sell_chart',
        data: {
          columns: [pr_sell_cnt],
          type: 'bar',
        },
        axis: {
          x: {
            type: 'category',
            categories: pr_sell,
          }
        },
        bar: {
          width: {
            ratio: 0.5,
          }
        }
      });
      let types_chart = c3.generate({
        bindto: '#types_chart',
        data: {
          columns: types_cnt,
          type: 'bar',
        },
        axis: {
          x: {
            type: 'category',
            categories: types,
          }
        },
        bar: {
          width: 100,
        }
      });
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user && this.user.userType !== 'regular'){
      this.showCharts = true;
    }

    this.userService.logoutEmitter$.subscribe(s=>{
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user && this.user.userType !== 'regular') {
        this.showCharts = true;
      }
      else{
        this.showCharts = false;
      }
    });

  }

  search() {
    let tempC;
    let tempL;
    let tempU;
    let numOfBad = 0;
    if (this.city === undefined || this.city.length === 0) {
      tempC = '';
      numOfBad++;
    }
    else {
      tempC = this.city;
    }

    if (this.lower === undefined || this.lower === null) {
      tempL = 0;
      numOfBad++;
    }
    else {
      tempL = this.lower;
    }

    if (this.upper === undefined || this.upper === null) {
      tempU = Number.MAX_VALUE;
      numOfBad++;
    }
    else {
      tempU = this.upper;
    }

    if (numOfBad === 3) {
      this.cityErr = this.lowerErr = this.upperErr = 'Must insert at least one constraint';
      return;
    }
    else {
      this.cityErr = this.lowerErr = this.upperErr = '';
    }

    if (tempL > tempU) {
      this.lowerErr = this.upperErr = 'Lower limit cannot be larger than upper';
      return;
    }
    else {
      this.lowerErr = this.upperErr = '';
    }
    this.estateService.estateSearch(tempC, tempL, tempU).subscribe((res: any) => {
      if (res.status === "OK") {
        this.searchResults = res.estates;
        this.promotedResults = [];
        this.searchResults.forEach((e: Estate) => {
          if (e.isPromoted) {
            this.promotedResults.push(e);
          }
        });
      }
      else {
      }
    });
  }

}
