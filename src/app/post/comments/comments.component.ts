import { Component, OnInit, Input } from '@angular/core';
import {Comment} from '../../classes/comment/comment'

@Component({
  selector: 'circle-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  constructor() { }

  ngOnInit(): void {
  }

}
