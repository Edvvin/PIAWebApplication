import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../data/user';
import {backendUri} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    return this.http.get(`${this.uri}/allusers`, null);
  }

  editUser(oldUsername: String, newUser: User){
    let data = {
      old: oldUsername,
      new: newUser
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
}
