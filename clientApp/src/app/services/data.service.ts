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

  getConfig(): Observable<any>{
    return this._http.get(`${environment.apiUrl}/api/configuration`);
  }

  getPractices(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/practice`);
  }

  getPracticeById(id:string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/api/practice/id/${id}`);
  }

  postPractice(practice: IPracticeViewModel): Observable<any> {
    return this._http.post(`${environment.apiUrl}/api/practice`, practice);
  }

  login(username: String, password: String):Observable<any>{
    return this._http.post(`${environment.apiUrl}/api/authenticate`, {username: username, password: password });
  }
}
