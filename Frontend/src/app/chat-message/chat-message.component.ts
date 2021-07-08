import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../data/estate';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  constructor() { }

  @Input()
  message: Message;

  @Input()
  isOwner: boolean;

  @Input()
  isAgency: boolean;

  name: string;
  isRight: boolean;
  time: Date;

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.isRight = (this.message.sender === user.username);
    if(this.isRight){
      this.name = 'You';
    } else{
      if(this.isAgency && !this.isOwner){
        this.name = 'Owner';
      }
      else{
        this.name = this.message.sender;
      }
    }
    this.time = new Date(this.message.time);
  }

}
