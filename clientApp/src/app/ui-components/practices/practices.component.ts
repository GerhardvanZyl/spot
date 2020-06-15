import { Component, OnInit } from '@angular/core';
import { IPractice } from 'src/app/model/ipractice';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IPracticeViewModel } from 'src/app/view-model/ipractice-viewmodel';
import { PracticeViewModel } from 'src/app/view-model/practice-viewmodel';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.less']
})
export class PracticesComponent implements OnInit {

  //practices: Observable<Practice[]>;
  practices: IPracticeViewModel[] = [];

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    //this.practices = this._dataService.getPractices();
    this._dataService.getPractices().subscribe(
      (data: IPractice[]) => {

        this.practices = []; // just make sure

        data.forEach( practice => {
          this.practices.push(new PracticeViewModel(practice));
        });
      },
      error => console.error(error)
    )
  }

  viewPractice(praticeId: string): void{
    
  }

}
