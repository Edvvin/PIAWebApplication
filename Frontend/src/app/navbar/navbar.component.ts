import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../data/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor( private router : Router) { }

  isGuest = true;
  isAdmin = false;
  user: User;

  sidebar = false;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = false;
    if (this.user) {
      this.isGuest = false;
      if(this.user.userType === 'admin'){
        this.isAdmin = true;
      }
    }
    else {
      this.isGuest = true;
    }

    this.router.events.subscribe(e => {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user) {
        this.isGuest = false;
        if (this.user.userType === 'admin') {
          this.isAdmin = true;
        }
      }
      else {
        this.isGuest = true;
      }
    });
  }

  toggleSidebar(): void {
    this.sidebar = !this.sidebar;
  }

  logout() {
    localStorage.removeItem('user');
    this.isGuest = true;
    this.isAdmin = false;
    this.user = null;
    this.router.navigate(['/']);
  }

}
