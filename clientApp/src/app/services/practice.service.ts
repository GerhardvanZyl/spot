import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subscriber } from 'rxjs';
import { IPractice } from '../model/ipractice';
import { IPracticeViewModel } from '../view-model/ipractice.viewmodel';
import { PracticeViewModel } from '../view-model/practice.viewmodel';
import { IAddressViewModel } from '../view-model/iaddress.viewmodel';
import { IContactInfoViewModel } from '../view-model/icontact-info.viewmodel';
import { Practice } from '../model/practice';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  practice: IPracticeViewModel;
  address: IAddressViewModel;
  contactInfo: IContactInfoViewModel;

  constructor(private _dataService: DataService) {
    console.log(' - Practice Service constructed ...');
  }

  getPractice(id: string): Observable<IPracticeViewModel> {

    return new Observable<IPracticeViewModel>(subscriber => {
      this._dataService.getPracticeById(id).subscribe((data: any) => {
        this.practice = new PracticeViewModel(data) as IPracticeViewModel;
        subscriber.next(this.practice);
      });
    });
  }

  getPractices(): Observable<IPracticeViewModel[]> {

    return new Observable<IPracticeViewModel[]>(subscriber => {

      this._dataService.getPractices().subscribe(
        (data: any[]) => {
          let practices = [];

          data.forEach(practice => {
            practices.push(new PracticeViewModel(practice));
          });

          subscriber.next(practices);
        }
      )
    });
  }

  savePractice(): Observable<void> {
    return new Observable(subscriber => {
      this._dataService.postPractice(new Practice(this.practice)).subscribe(
        (result) => {
          console.log(result);
          subscriber.next(result);
        }
      );
    });
  }

  deletePractice(id: string): Observable<void> {
    return new Observable(subscriber => {
      this._dataService.deletePractice(this.practice.id).subscribe((data) => {
        // TODO: Error handling
        subscriber.next(data);
      });
    })
  }

}
