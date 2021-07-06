import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {backendUri} from '../globals';
import { Estate } from '../data/estate';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  constructor(private http:HttpClient) { }

  uri = backendUri;

  addImage(estateid: string, image: string) {
    let data = {
      id: estateid,
      img: image
    };

    return this.http.post(`${this.uri}/setestateimage`, data);
  }

  addEstate(es: Estate) {
    return this.http.post(`${this.uri}/addestate`, es);
  }

  getAllEstates(){
    return this.http.get(`${this.uri}/getallestates`, null);
  }

  getEstate(id: string) {
    let data = {
      id: id,
    };

    return this.http.post(`${this.uri}/getestate`, data);
  }

  estateSearch(city: string, lower: number, upper: number){
    let data = {
      city: city,
      lower: lower,
      upper: upper,
    };

    return this.http.post(`${this.uri}/search`, data);
  }

  verifyEstate(estateId: number, byWho: string, agency: string){
    let data = {
      estateId: estateId,
      byWho: byWho,
      agency: agency,
    };
    return this.http.post(`${this.uri}/verifyestate`, data);
  }

  sendMessageToOwner(estateId: string, fromUsername: string, message: string){
    let data = {
      id: estateId,
      fromUser: fromUsername,
      message: message,
    }

      return this.http.post(`${this.uri}/sendtoowner`, data);
  }

  sendMessageToClient(estateId:string, fromUsername: string, toUsername: string, message: string){
    let data = {
      id: estateId,
      fromUser: fromUsername,
      toUser: toUsername,
      message: message,
    }

      return this.http.post(`${this.uri}/sendtoclient`, data);
  }

  newChat (estateId: string, username: string) {
    let data = {
      id: estateId,
      username: username,
    };

    return this.http.post(`${this.uri}/newchat`, data);
  }

  sendOffer(estateId: string, username: string, fromDate: Date, toDate: Date, offer: number){
    let data = {
      id: estateId,
      username: username,
      dateFrom: fromDate,
      dateTo: toDate,
      offer: offer,
    };

    return this.http.post(`${this.uri}/sendoffer`, data);
  }

  acceptOffer(estateId: string, username: string){
    let data = {
      id: estateId,
      username: username,
    };

    return this.http.post(`${this.uri}/acceptoffer`, data);
  }

  declineOffer(estateId: string, username: string){
    let data = {
      id: estateId,
      username: username,
    };

    return this.http.post(`${this.uri}/declineoffer`, data);
  }

}
