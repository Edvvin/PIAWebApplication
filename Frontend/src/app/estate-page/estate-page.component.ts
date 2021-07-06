import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, ɵangular_packages_router_router_b } from '@angular/router';
import { Estate } from '../data/estate';
import { User } from '../data/user';
import { EstateService } from '../services/estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-estate-page',
  templateUrl: './estate-page.component.html',
  styleUrls: ['./estate-page.component.css']
})
export class EstatePageComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,
              private userService: UserService,
              private estateService: EstateService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  estate: Estate;
  imgUrls = [];
  isLoaded = false;
  loan: boolean;
  canContact: boolean;
  user: User;

  gotoContact(){
    this.router.navigate(['/chat', this.estate._id]);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe(params => {
      let eid = params['id'];
      this.estateService.getEstate(eid).subscribe((res: any) => {
        this.estate = res.estate;
        console.log(this.estate);
        this.estate.images.forEach((img) => {
          this.userService.download(img).subscribe(
            u => {
              let url = URL.createObjectURL(u);
              this.imgUrls.push(this.sanitizer.bypassSecurityTrustUrl(url));
            },
            error => console.error(error)
          );

        });
        this.canContact = this.estate.ownedByAgency &&
          this.user.userType === "agent" &&
          this.user.agencyName === this.estate.agency;
        this.canContact ||= !this.estate.ownedByAgency && this.user.username === this.estate.owner;
        this.canContact = !this.canContact;
        this.isLoaded = true;
       });
    });
  }

}
