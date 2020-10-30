import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPractice } from '../model/Ipractice';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPracticeViewModel } from '../view-model/ipractice.viewmodel';
import { ThrowStmt } from '@angular/compiler';
import { IPatient } from '../model/ipatient';

export interface IDataService {
    getSessionInfo: ()=> Observable<any>;
    getConfig: ()=> Observable<any>;
    getPractices: ()=> Observable<any>;
    getPracticeById: (id:string)=> Observable<any>;
    postPractice: (practice: IPractice)=> Observable<any>;
    deletePractice: (id: string)=> Observable<any>;
    getPatients: ()=> Observable<any>;
    getPatientById: (id:string)=> Observable<any>;
    postPatient: (practice: IPatient)=> Observable<any>;
    deletePatient: (id:string)=> Observable<any>;
    getPatientsBy: (key:string, value:string)=> Observable<any>;
}