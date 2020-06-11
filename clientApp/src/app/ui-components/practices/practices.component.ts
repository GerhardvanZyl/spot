import { Component, OnInit } from '@angular/core';
import { Practice } from 'src/app/model/practice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.less']
})
export class PracticesComponent implements OnInit {

  practices: Observable<Practice[]>;

  constructor() { }

  ngOnInit(): void {
    
  }

}
