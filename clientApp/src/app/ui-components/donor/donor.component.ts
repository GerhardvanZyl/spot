import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatientViewModel } from 'src/app/view-model/ipatient.viewmodel';
import { PatientViewModel } from 'src/app/view-model/patient.viewmodel';
import { PatientService } from 'src/app/services/patient.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IPractice } from 'src/app/model/ipractice';
import { IPracticeViewModel } from 'src/app/view-model/ipractice.viewmodel';
import { PracticeService } from 'src/app/services/practice.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.less']
})
export class DonorComponent implements OnInit {

  donor: IPatientViewModel = <IPatientViewModel>{};
  practices: IPracticeViewModel[] = [];

  constructor(private _patientService: PatientService, private _practiceService: PracticeService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    let donorId = this._route?.snapshot?.params?.id;

    if (donorId) {
      this._patientService.getPatient(donorId).subscribe(data => {
        this.donor = data;
      });
    } else {
      this.donor = this._patientService.patient = new PatientViewModel();
    }

    this._practiceService.getPractices().subscribe(data => {
      this.practices = data;
      console.log(data);
    });
  }

  delete(id): void {
    this._patientService.delete().subscribe(() => { });;
  }

  onSubmit(form): void {
    this._patientService.savePatient().subscribe(() => { });;
  }

  selectPractice(practice): void {
    if (practice) {
      this.donor.practiceId = practice.id;
      this.donor.practiceName = practice.name;
    }
  }
}
