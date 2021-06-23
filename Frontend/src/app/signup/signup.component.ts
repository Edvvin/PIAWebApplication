import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  selectedFiles : object;

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(typeof(event.target.files));
  }

}
