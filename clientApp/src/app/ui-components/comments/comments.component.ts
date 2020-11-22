import { Component, Input, OnInit } from '@angular/core';
import {Comment} from '../../model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.less']
})

export class CommentsComponent implements OnInit {

  @Input() comments: Comment[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addComment():void{
    debugger;
    this.comments.push(new Comment());
  }

}
