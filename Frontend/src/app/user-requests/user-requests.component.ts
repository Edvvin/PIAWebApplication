import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../data/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  users = [];

  accept(u) {
    this.userService.accept(u.user.username).subscribe((res: any) => {
      if (res.status === 'OK') {
        let i = 0;
        this.users.forEach((e: any) => {
          if (e.user.username === u.user.username) {
            this.users.splice(i);
            return;
          }
          i++;
        });
      }
    });
  }

  reject(u) {
    this.userService.reject(u.user.username).subscribe((res: any) => {
      let i = 0;
      if (res.status === 'OK') {
        this.users.forEach((e: any) => {
          if (e.user.username === u.user.username) {
            this.users.splice(i);
            console.log('fdaf');
            return;
          }
          i++;
        });
      }
    });

  }

  ngOnInit(): void {
    this.userService.getUnverifiedUsers().subscribe((res: any) => {
      res.forEach(usr => {
        if (usr.image !== '') {
          this.userService.download(usr.image).subscribe(
            u => {
              let url = URL.createObjectURL(u);
              let imgUrl = this.sanitizer.bypassSecurityTrustUrl(url);
              this.users.push({
                user: usr,
                imgUrl: imgUrl,
              });
            },
            error => console.error(error)
          );
        }
        else {
          this.users.push({
            user: usr,
            imgUrl: '',
          });
        }
      });
    });
  }

}
