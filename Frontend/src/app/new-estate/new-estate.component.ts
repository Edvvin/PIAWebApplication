import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-estate',
  templateUrl: './new-estate.component.html',
  styleUrls: ['./new-estate.component.css']
})
export class NewEstateComponent implements OnInit {

  constructor() { }
  
  selectedFiles : object;

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(typeof(event.target.files));
  }

}
