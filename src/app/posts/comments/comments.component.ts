import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment/comment';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'circle-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {}
  submitComment(): void {
    console.log(this.commentForm.value);
  }
}
