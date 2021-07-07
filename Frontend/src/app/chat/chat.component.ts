import { Component, Input, OnInit } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { ActivatedRoute } from '@angular/router';
import { Chat, Estate, Message } from '../data/estate';
import { User } from '../data/user';
import { EstateService } from '../services/estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private userService: UserService,
    private estateService: EstateService,
    private activatedRoute: ActivatedRoute) { }


  estate: Estate;
  user: User;
  toUser: string;
  isOwner: boolean;
  isLoaded: boolean;
  chat: Chat;
  msgText: string;
  dateFrom: Date;
  dateTo: Date;
  dateFilter: any;
  btnerr: string;
  offer: number;
  currentOffer: number;

  isAfter(date1: Date, date2: Date, orSame: boolean){
    if(date1.getFullYear() > date2.getFullYear()){
      return true;
    }
    else if(date1.getFullYear() < date2.getFullYear()){
      return false;
    }
    else{
      if (date1.getMonth() > date2.getMonth()) {
        return true;
      }
      else if (date1.getMonth() < date2.getMonth()) {
        return false;
      }
      else {

        if (date1.getDate() > date2.getDate()) {
          return true;
        }
        else if (date1.getDate() < date2.getDate()) {
          return false;
        }
        else {
          return orSame;
        }
      }
    }
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe(params => {
      let eid = params['id'];
      let usr = params['usr'];
      this.estateService.getEstate(eid).subscribe((res: any) => {
        this.estate = res.estate;
        if (usr){
          this.isOwner = true;
          this.chat = this.estate.chats.find((c) => c.username === usr);
          this.toUser = usr;
        } else {
          this.isOwner = false;
          this.chat = this.estate.chats.find((c) => c.username === this.user.username);
        }
        if (this.chat){
          this.chat.messages.reverse();
          if (this.chat.offer){
            this.currentOffer = this.chat.offer.price;
          }
          else{
            this.currentOffer = undefined;
          }
        }
        this.secondDateChosen(true);
        this.btnerr = 'accent';
        this.isLoaded = true;
      });
    });

  }

  sendMessage(): void {
        if (this.isOwner) {
          this.estateService.sendMessageToClient(this.estate._id, this.user.username, this.toUser, this.msgText).subscribe((res: any)=>{
            if (res.status === 'OK'){
              this.chat.messages.unshift({ text: this.msgText, fromClient: false, sender: this.user.username });
              this.msgText = '';
            }
          });
        } else {
          this.estateService.sendMessageToOwner(this.estate._id, this.user.username, this.msgText).subscribe((res: any)=>{
            if (res.status === 'OK'){
              this.chat.messages.unshift({ text: this.msgText, fromClient: true, sender: this.user.username });
              this.msgText = '';
            }
          });
        }
  }

  sendMessageClick(): void {
    if (!this.chat) {
      let withWho = this.isOwner ? this.toUser : this.user.username;
      this.estateService.newChat(this.estate._id, withWho).subscribe((res: any) => {
        if(res.status === "OK"){
          this.chat = res.chat;
          this.sendMessage();
        }
        else{
          console.log(res.message);
        }
      });
    } else {
      this.sendMessage();
    }
  }

  sendOfferClick(){
    if(!this.dateTo || !this.dateFrom){
      this.btnerr = "warn";
      return;
    }
    if (!this.chat) {
      let withWho = this.isOwner ? this.toUser : this.user.username;
      this.estateService.newChat(this.estate._id, withWho).subscribe((res) => {
        this.sendOffer();
      });
    } else {
      this.sendOffer();
    }

  }

  sendOffer(){
    this.estateService.sendOffer(this.estate._id, this.user.username, this.dateFrom, this.dateTo, this.offer).subscribe((res: any) => {
      if (res.status === 'OK'){
        this.currentOffer = this.offer;
        this.offer = undefined;
      }
    });
  }

  acceptOffer() {
    this.estateService.acceptOffer(this.estate._id, this.toUser).subscribe((res: any)=>{
      if (res.status === 'OK'){
        this.currentOffer = undefined;
      }
    });
  }

  declineOffer(){
    this.estateService.declineOffer(this.estate._id, this.toUser).subscribe((res: any)=>{
      if (res.status === 'OK'){
        this.currentOffer = undefined;
      }
    });
  }

  firstOccupiedFound = false;

  firstDateChosen(){
    if(!this.dateFrom){
      return;
    }
    this.firstOccupiedFound = false;
    this.dateFilter = (date: Date) => {
      if (!date) {
        return false;
      }
      if (this.isAfter(date, this.dateFrom, true)) {
        let ret = true;
        this.estate.occupied.forEach((r) => {
          let frod = new Date(r.fromDate);
          if (this.isAfter(date, frod, true) && this.isAfter(frod, this.dateFrom, true)) {
            ret = false;
            console.log(frod);
            return;
          }
        });
        return ret;
      }
      else{
        return false;
      }
    };

  }

  secondDateChosen(first: boolean){
    if(!this.dateTo && !first){
      return;
    }
    this.dateFilter = (date: Date) => {
      if(!date){
        return false;
      }
      if(this.isAfter(new Date(), date, true)){
        return false;
      }
      let ret = true;
      this.estate.occupied.forEach((r) => {
        let frod = new Date(r.fromDate);
        let tod = new Date(r.toDate);
        if (this.isAfter(date, frod, true) && this.isAfter(tod, date, true)) {
          ret = false;
          return;
        }
      });
      return ret;
    };
    this.btnerr = 'accent';
  }

}
