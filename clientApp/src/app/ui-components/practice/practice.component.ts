import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPracticeViewModel } from 'src/app/view-model/ipractice.viewmodel';
import { PracticeViewModel } from 'src/app/view-model/practice.viewmodel';
import { PracticeService } from 'src/app/services/practice.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.less']
})
export class PracticeComponent implements OnInit {

  practice: IPracticeViewModel = <IPracticeViewModel>{};

  constructor(private _practiceService: PracticeService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let practiceId = this._route?.snapshot?.params?.id;

    if (practiceId) {
      this._practiceService.getPractice(practiceId)
        .subscribe( practice => this.practice = practice);
    } else {
      this.practice = this._practiceService.practice = new PracticeViewModel();
    }
  }

  onSubmit() {
    this._practiceService.savePractice().subscribe();
  }

  delete(){
    this._practiceService.deletePractice().subscribe();
  }
}