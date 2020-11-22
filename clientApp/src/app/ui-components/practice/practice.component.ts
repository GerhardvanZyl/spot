import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPracticeViewModel } from 'src/app/view-model/ipractice.viewmodel';
import { PracticeViewModel } from 'src/app/view-model/practice.viewmodel';
import { PracticeService } from 'src/app/services/practice.service';
import { StatusComponent } from '../status/status.component';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.less'],
})
export class PracticeComponent implements OnInit {
  practice: IPracticeViewModel = <IPracticeViewModel>{};
  @ViewChild('status') statusComponent: StatusComponent;

  constructor(
    private _practiceService: PracticeService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let practiceId = this._route?.snapshot?.params?.id;

    if (practiceId) {
      this._practiceService
        .getPractice(practiceId)
        .subscribe((practice) => (this.practice = practice));
    } else {
      this.practice = this._practiceService.practice = new PracticeViewModel();
    }
  }

  onSubmit() {
    this.statusComponent.showSaving();
    this._practiceService.savePractice().subscribe(() => {
      setTimeout(() => {
        this.statusComponent.hideSaving();
        this.statusComponent.setSavingSuccess();
      }, 3000);
    });
  }

  delete() {
    this._practiceService.deletePractice().subscribe();
  }
}
