import { Component, OnInit } from '@angular/core';
import { IPatientViewModel } from 'src/app/view-model/ipatient.viewmodel';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.less']
})
export class DonorsComponent implements OnInit {

  donors: IPatientViewModel[] = [];

  constructor(private _patientService: PatientService) { }

  ngOnInit(): void {
    this._patientService.getDonors().subscribe(
      (data: IPatientViewModel[]) => {

        this.donors = data;

      });
  }

  sortBy(property): void {

    if (property === 'lastBDDisplayDate') {
      this.donors.sort((a, b): number => {
        if (!a[property]) return -1;
        if (!b[property]) return 1;

        return a[property] - b[property];
      });
    } else {
      this.donors.sort((a, b): number => {

        if (!a[property]) return -1;
        if (!b[property]) return 1;

        if(typeof a[property] === 'string' && typeof b[property] === 'string' ) {
          if (a[property].toLocaleLowerCase() < b[property].toLocaleLowerCase()) return -1;
          if (a[property].toLocaleLowerCase() > b[property.toLocaleLowerCase()]) return 1;  
        }

        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
      });
    }
  }
}
