import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPractice } from '../model/Ipractice';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPracticeViewModel } from '../view-model/Ipractice-viewmodel';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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

  getPracticeById(id:string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/practice/id/${id}`);
  }

  postPractice(practice: IPracticeViewModel): Observable<any> {
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

  postPatient(practice: IPracticeViewModel): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/patient`, practice);
  }

  deletePatient(id: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/api/patient/id/${id}`);
  }

  // Donors
  getDonors(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/donor`);
  }

}
