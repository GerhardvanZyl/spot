import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Practice } from '../model/practice';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getPractices():Observable<any> {
    return this._http.get('/api/practice');
  }

  postPractice(practice: Practice) : Observable<any> {
    return this._http.post('/api/practice', practice);
  }
}
