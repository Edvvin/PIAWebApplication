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


  constructor(private router: Router, private userService: UserService) {}

  isGuest = true;
  isAdmin = false;
  isAgent = false;
  user: User;

  sidebar = false;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.isAdmin = false;
    this.isAgent = false;
    if (this.user) {
      this.isGuest = false;
      if (this.user.userType === 'admin') {
        this.isAdmin = true;
      }
      else if (this.user.userType === 'agent') {
        this.isAgent = true;
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
        else if (this.user.userType === 'agent') {
          this.isAgent = true;
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
    this.isGuest = true;
    this.isAdmin = false;
    this.isAgent = false;
    this.userService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }

}
