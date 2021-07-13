import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = JSON.parse(localStorage.getItem('user'));
    let access = route.url[0].toString();
    if (access === 'login' || access === 'signup') {
      if (user) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
    else if (access === 'inbox' || access === 'myestates'
      || access === 'newestate' || access === 'usersettings'
      || access === 'estate' || access === 'edituser') {
      if (user) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }
    else if (access === 'chat') {
      if (route.url.length === 1) {
        this.router.navigate(['']);
        return false;
      }
      else if (route.url.length <= 3) {
        if (user) {
          return true;
        }
        this.router.navigate(['']);
        return false;
      }
      else {
        this.router.navigate(['']);
        return false;
      }
    }
    else if (access === 'verifyestates' || access === 'sales') {
      if (user) {
        if (user.userType === 'regular') {
          this.router.navigate(['']);
          return false;
        }
        else {
          return true;
        }
      }
      else {
        this.router.navigate(['']);
        return false;
      }
    }
    else if (access === 'userrequests' || access === 'allusers' || access === 'adduser' || access === 'setpercent') {
      if (user) {
        if (user.userType === 'admin') {
          return true;
        }
        this.router.navigate(['']);
        return false;
      }
    }

    return true;
  }
}
