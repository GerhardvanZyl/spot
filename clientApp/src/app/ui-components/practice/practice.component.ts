import { Component, OnInit } from '@angular/core';
import { IPractice } from 'src/app/model/Ipractice';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { IPracticeViewModel } from 'src/app/view-model/ipractice.viewmodel';
import { PracticeViewModel } from 'src/app/view-model/practice.viewmodel';
import { IAddress } from 'src/app/model/iaddress';
import { Practice } from 'src/app/model/practice';
import { PracticeService } from 'src/app/services/practice.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.less']
})
export class PracticeComponent implements OnInit {

  practice: IPracticeViewModel = <IPracticeViewModel>{};

  constructor(private _practiceService: PracticeService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    let practiceId = this._route?.snapshot?.params?.id;

    if (practiceId) {
      this._practiceService.getPractice(practiceId)
        .subscribe( practice => this.practice = practice);
    }
  }

  onSubmit(form: NgForm) {

    this._practiceService.savePractice().subscribe();


  }

  delete(id: string){
    console.log('delete fired');
    this._practiceService.deletePractice(id).subscribe();
    
    console.log("delete compelte");
  }

}
