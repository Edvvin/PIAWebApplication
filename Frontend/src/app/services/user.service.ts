import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../data/user';
import {backendUri} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public logoutEmitter$: EventEmitter<string>;

  constructor(private http:HttpClient) {
    this.logoutEmitter$ = new EventEmitter();
   }

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
    this.logoutEmitter$.emit('');
  }

  verifyUser(username: string) {
    let data = {
      username: username,
    };
    return this.http.post(`${this.uri}/verifyuser`, data);
  }

  getUnverifiedUsers() {
    let data = {};
    return this.http.get(`${this.uri}/unverified`, data);
  }

  getAllUsers() {
    let data = {};
    return this.http.get(`${this.uri}/allusers`, data);
  }

  getUser(username: string) {
    let data = {
      username: username,
    };

    return this.http.post(`${this.uri}/getuser`, data);
  }

  editUser(username: string, user: User){
    let data = {
      username: username,
      user: user,
    }

    return this.http.post(`${this.uri}/edituser`, data);
  }

  changePassword(username: string, password: string, newpass: string) {
      let data = {
        username: username,
        password: password,
        newpassword: newpass,
      };
    return this.http.post(`${this.uri}/changepass`, data);
  }

  upload(formData : FormData){
    return this.http.post(`${this.uri}/upload`, formData);
  }

  download(file: string) {
    var body = {
      filename: file
    };

    return this.http.post(`${this.uri}/download`, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  setImage(username: string, image: any) {
    let data = {
      username: username,
      img: image
    }
    return this.http.post(`${this.uri}/setimage`, data);
  }

  accept(username: string) {
    let data = {
      username: username,
    }
    return this.http.post(`${this.uri}/acceptuser`, data);
  }

  reject(username: string) {
    let data = {
      username: username,
    }
    return this.http.post(`${this.uri}/rejectuser`, data);
  }

  block(blocker: string, blocked: string, isAgency: boolean) {
    let data = {
      blocker: blocker,
      blocked: blocked,
      isAgency: isAgency,
    };

    return this.http.post(`${this.uri}/block`, data);
  }

}
