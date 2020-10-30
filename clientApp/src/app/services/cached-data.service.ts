import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatient } from '../model/ipatient';
import { IPractice } from '../model/ipractice';
import { IDataService } from './idata.service';

@Injectable({
  providedIn: 'root'
})
export class CachedDataService implements IDataService {

  private timeout: number = 5 * 60 * 1000;
  constructor(private _dataService: IDataService) { }

  getSessionInfo:()=> Observable<any>;

  getConfig: () => Observable<any>;
  getPractices: () => Observable<any>;
  getPracticeById: (id: string) => Observable<any>;
  postPractice: (practice: IPractice) => Observable<any>;
  deletePractice: (id: string) => Observable<any>;
  getPatients: () => Observable<any>;
  getPatientById: (id: string) => Observable<any>;
  postPatient: (practice: IPatient) => Observable<any>;
  deletePatient: (id: string) => Observable<any>;
  getPatientsBy: (key: string, value: string) => Observable<any>;
}
