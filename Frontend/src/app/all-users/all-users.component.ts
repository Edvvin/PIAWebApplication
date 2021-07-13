import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }
  users = [];

  kill(user) {
    this.userService.reject(user.username).subscribe((res: any) => {
      if (res.status === 'OK') {
        let i = this.users.findIndex((e => e.user.username === user.username));
        if(i!==-1){
          this.users.splice(i);
        }
      }
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res: any) => {
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
