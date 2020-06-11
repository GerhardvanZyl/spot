import { Component, OnInit } from '@angular/core';
import { Practice } from 'src/app/model/practice';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.less']
})
export class PracticeComponent implements OnInit {

  practice: Practice = {
    name: null,
    address: null,
    emailAddresses: [],
    phoneNumbers: []
  };

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
    this._dataService.postPractice(this.practice).subscribe(
      result => console.log("success"),
      error => console.log("err")
    );
  }

}
