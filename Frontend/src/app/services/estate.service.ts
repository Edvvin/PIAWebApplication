import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {backendUri} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  constructor(private http:HttpClient) { }

  uri = backendUri;

  getAllEstates(){
    return this.http.get(`${this.uri}/getallestates`, null);
  }

  estateSearch(city: string, lower: number, upper: number){
    let data = {
      city: city,
      lower: lower,
      upper: upper
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

  sendMessageToOwner(estateId:string, fromUsername: string){
    let data = {
      estateId: estateId,
      fromUsername: fromUsername
    }

      return this.http.post(`${this.uri}/sendtoowner`, data);
  }

  sendMessageToClient(estateId:string, fromUsername: string, toUsername: string){
    let data = {
      estateId: estateId,
      fromUsername: fromUsername,
      toUsername: toUsername
    }

      return this.http.post(`${this.uri}/sendtoowner`, data);
  }
}
