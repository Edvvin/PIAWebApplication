import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-estate',
  templateUrl: './new-estate.component.html',
  styleUrls: ['./new-estate.component.css']
})
export class NewEstateComponent implements OnInit {

  constructor() { }

  selectedFiles = [];

  fileSelectErrMsg: string;

  ngOnInit(): void {
  }

  selectFile(event) {
    let temp = event.target.files;
    if (temp.length > 0) {
      this.selectedFiles.push(temp);
    }
    console.log(this.selectedFiles);
  }

  removeFile(f) {
    var index = this.selectedFiles.indexOf(f);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

}
