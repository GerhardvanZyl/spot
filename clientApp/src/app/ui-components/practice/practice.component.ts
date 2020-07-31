import { Component, OnInit } from '@angular/core';
import { IPractice } from 'src/app/model/Ipractice';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { IPracticeViewModel } from 'src/app/view-model/Ipractice-viewmodel';
import { PracticeViewModel } from 'src/app/view-model/practice-viewmodel';
import { IAddress } from 'src/app/model/iaddress';
import { IContactInfo } from 'src/app/model/icontact-info';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.less']
})
export class PracticeComponent implements OnInit {

  practice: IPracticeViewModel = new PracticeViewModel();

  constructor(private _dataService: DataService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    let practiceId = this._route?.snapshot?.params?.id;

    if (practiceId) {
      this._dataService.getPracticeById(practiceId).subscribe(
        (data: IPractice) => {
          this.practice = new PracticeViewModel(data);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    console.log('submitting');
    console.log(form);
    this._dataService.postPractice(this.practice).subscribe(
      () => console.log("success"),
      () => console.log("err")
    );
  }

  delete(id: string){
    console.log('delete fired');
    this._dataService.deletePractice(id).subscribe(
      () => this._router.navigate(['/practices']),
      (err) => console.error("err: ", err)
    )
  }

}
