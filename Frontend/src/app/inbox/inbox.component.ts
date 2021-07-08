import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat, Estate } from '../data/estate';
import { User } from '../data/user';
import { EstateService } from '../services/estate.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(
    private estateService: EstateService,
    private router: Router
  ) { }

  estates: Estate[];
  user: User;
  inboxChats = [];
  archivedChats = [];
  isLoaded = false;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.estateService.getAllEstates().subscribe((res: any) => {
        res.forEach((e: Estate) => {
          if ((this.user.username === e.owner && !e.ownedByAgency) ||
            (this.user.agencyName === e.agency && e.ownedByAgency)) {
            e.chats.forEach((c: Chat) => {
              if (c.isArchivedByOwner) {
                this.archivedChats.push({
                  chat: c,
                  estate: e,
                  isOwner: true,
                });
              }
              else {
                this.inboxChats.push({
                  chat: c,
                  estate: e,
                  isOwner: true,
                });
              }
            });
          }
          else {
            e.chats.forEach((c: Chat) => {
              if (c.username === this.user.username) {
                if (c.isArchivedByCustomer) {
                  this.archivedChats.push({
                    chat: c,
                    estate: e,
                    isOwner: false,
                  });
                }
                else {
                  this.inboxChats.push({
                    chat: c,
                    estate: e,
                    isOwner: false,
                  });
                }
              }
            });

          }
        });
        this.archivedChats.sort((c1, c2) => c2.chat.time.getTime() - c1.chat.time.getTime());
        this.inboxChats.sort((c1, c2) => new Date(c2.chat.time).getTime() - new Date(c1.chat.time).getTime());
        this.isLoaded = true;
      });
    }
  }

  gotoChat(c: any){
    if(c.isOwner){
      this.router.navigate(['/chat', c.estate._id, c.chat.username]);
    } else {
      this.router.navigate(['/chat', c.estate._id]);
    }
  }
}