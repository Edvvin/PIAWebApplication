import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { EstateService } from '../services/estate.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private estateService: EstateService) { }

  displayedColumns: string[] = ['estate', 'from', 'to', 'amount', 'profit'];
  dataSource: any[];
  loaded = false;
  profit = 0;

  ngOnInit(): void {
    this.dataSource = [];
    this.estateService.getAllSold().subscribe((res: any) => {
      res.forEach(e => {
        let from = e.ownedByAgency?'Houses and stuff' : e.owner;
        this.dataSource.push({
          estate: e.name,
          from: from,
          to: e.sold.toUser,
          amount: e.sold.amount,
          profit: e.sold.profit,
        });
        this.profit += e.sold.profit;
      });
      this.loaded = true;
    });
  }

}
