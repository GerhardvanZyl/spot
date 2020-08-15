import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatientViewModel } from 'src/app/view-model/ipatient.viewmodel';
import { PatientViewModel } from 'src/app/view-model/patient.viewmodel';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.less']
})
export class DonorComponent implements OnInit {

  donor: IPatientViewModel = <IPatientViewModel>{};

  constructor(private _patientService: PatientService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    let donorId = this._route?.snapshot?.params?.id;

    if(donorId){
      this._patientService.getPatient(donorId).subscribe(data => {
        this.donor = data;
      });
    }
  }

  delete(id):void{
    this._patientService.delete().subscribe(()=>{});;
  }

  onSubmit(form):void{
    this._patientService.savePatient().subscribe(()=>{});;
  }
}
