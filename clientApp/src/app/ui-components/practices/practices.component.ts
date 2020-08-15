import { Component, OnInit } from '@angular/core';
import { IPractice } from 'src/app/model/ipractice';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { IPracticeViewModel } from 'src/app/view-model/ipractice.viewmodel';
import { PracticeViewModel } from 'src/app/view-model/practice.viewmodel';
import { PracticeService } from 'src/app/services/practice.service';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.less']
})
export class PracticesComponent implements OnInit {

  //practices: Observable<Practice[]>;
  practices: IPracticeViewModel[] = [];

  constructor(private _practiceService: PracticeService) { }

  ngOnInit(): void {
    //this.practices = this._dataService.getPractices();
    this._practiceService.getPractices().subscribe(
      practices => this.practices = practices,
      error => console.error(error)
    )
  }
}
