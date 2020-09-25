import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { IPracticeViewModel } from '../view-model/ipractice.viewmodel';
import { IPatient } from '../model/ipatient';
import { PatientViewModel } from '../view-model/patient.viewmodel';
import { IPatientViewModel } from '../view-model/ipatient.viewmodel';
import { Observable, Subscriber } from 'rxjs';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patient: IPatientViewModel;

  constructor(private _dataService: DataService) {
    console.log('Patient Service constructed');
  }

  getPatient(id: string): Observable<IPatientViewModel> {
    return new Observable(subscriber => {
      this._dataService.getPatientById(id).subscribe((data: any) => {
        this.patient = new PatientViewModel(data) as IPatientViewModel;

        this._dataService.getPracticeById(this.patient.practiceId).subscribe((data: any) => {
          if(data) {
            this.patient.practiceName = data.name;
          }
          subscriber.next(this.patient);
        },
        err => {
          console.log(err);
          subscriber.next(this.patient);
        })
      });
    });
  }

  getDonors(): Observable<IPatientViewModel[]> {

    return new Observable<IPatientViewModel[]>(subscriber => {

      this._dataService.getPatients().subscribe(
        (data: any[]) => {
          let patients = [];

          data.forEach(patient => {

            // TODO: Caching dataservice
            if(patient.practiceId){
              this._dataService.getPracticeById(patient.practiceId).subscribe((practiceData: any) => {

                if(practiceData) {
                  patient.practiceName = practiceData.name;
                }
  
                patients.push(new PatientViewModel(patient));
                subscriber.next(patients);

              });
            } else {
              patients.push(new PatientViewModel(patient));
              subscriber.next(patients);
            }
            
          });
        },
        err => console.log(err)
      )
    });
  }

  savePatient(): Observable<void> {

    return new Observable(subscriber => {

      this._dataService.postPatient(new Patient(this.patient)).subscribe(
        (data: any) => {
          subscriber.next(data);
        },
        err => console.log(err)
      )
    });
  }

  delete(): Observable<void> {
    return new Observable(subscriber => {
      this._dataService.deletePatient(this.patient.id).subscribe((data: any) => {
        subscriber.next();
      });
    });
  }
}
