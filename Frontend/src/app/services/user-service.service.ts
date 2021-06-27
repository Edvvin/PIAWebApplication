import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import User from '../data/user';
import {backendUri} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  uri = backendUri;

  register(user : User){
    return this.http.post(`${this.uri}/register`, user);
  }

  login(username: string, password: string){
    let data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  logout() {
    localStorage.removeItem('user');
  }

  verifyUser(username: string) {
    let data = {
      username: username,
    };
    return this.http.post(`${this.uri}/verifyuser`, data);
  }

  getUnverifiedUsers() {
    return this.http.get(`${this.uri}/unverified`, null);
  }

  getAllUsers() {
    return this.http.get(`${this.uri}/allusers`, null);
  }

  editUser(oldUsername: String, newUser: User){
    let data = {
      old: oldUsername,
      new: newUser
    }

    return this.http.post(`${this.uri}/edituser`, data);
  }

  changePassword(username: string, oldpass: string, newpass, string) {
      let data = {
        username: username,
        password: newpass
      }
    return this.http.post(`${this.uri}/changepass`, data);
  }

}
