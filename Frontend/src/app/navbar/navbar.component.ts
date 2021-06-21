import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
  ) { }

  sidebar = false;

  ngOnInit(): void {
  }

  toggleSidebar() : void{
    this.sidebar = !this.sidebar;
  }

}
