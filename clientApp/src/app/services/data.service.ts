import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPractice } from '../model/Ipractice';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPracticeViewModel } from '../view-model/ipractice.viewmodel';
import { ThrowStmt } from '@angular/compiler';
import { IPatient } from '../model/ipatient';
import { IDataService } from './idata.service';

@Injectable({
  providedIn: 'root'
})

export class DataService implements IDataService {

  constructor(private _http: HttpClient) { }

  // Session
  getSessionInfo(): Observable<any>{
    return this._http.get(`${environment.apiUrl}/authentication/sessionInfo`);
  }

  //Config
  getConfig(): Observable<any>{
    return this._http.get(`${environment.apiUrl}/api/configuration`);
  }

  //Practices
  getPractices(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/practice`);
  }

  getPracticeById(id:string): Observable<IPractice> {
    return this._http.get(`${environment.apiUrl}/api/practice/id/${id}`) as Observable<IPractice>;
  }

  postPractice(practice: IPractice): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/practice`, practice);
  }

  deletePractice(id: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/practice/id/${id}`);
  }

  // Patients
  getPatients(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/patient`);
  }

  getPatientById(id:string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/patient/id/${id}`);
  }

  postPatient(practice: IPatient): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/patient`, practice);
  }

  deletePatient(id: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/patient/id/${id}`);
  }

  getPatientsBy(key: string, value:string): Observable<IPatient> {
    return this._http.get(`${environment.apiUrl}/api/patient/${key}/${value}`) as Observable<IPatient>;
  }

}
