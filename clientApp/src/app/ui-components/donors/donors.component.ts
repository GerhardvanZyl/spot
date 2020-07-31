import { Component, OnInit } from '@angular/core';
import { IPatient } from 'src/app/model/ipatient';
import { IPatientViewModel } from 'src/app/view-model/ipatient-viewmodel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.less']
})
export class DonorsComponent implements OnInit {

  donors:IPatientViewModel[] = [];

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this._dataService.getDonors().subscribe(
      (data:IPatient[]) => {

        this.donors = []; //just make sure we start clean and it exists

        data.forEach( donor => {
          //this.donors.push(new PatientViewModel)
        })
      }
    )
  }

}
