import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../models/comment/comment';
import { FormGroup, FormControl } from '@angular/forms';
import { CircleService } from 'src/app/services/circle.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'circle-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() cid: string;
  @Input() user: User;
  @Input() comments: Comment[];
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
  constructor(private circleService: CircleService) {}

  ngOnInit(): void {}
  submitComment(): void {
    this.circleService.postComment(
      this.cid,
      new Comment(
        undefined,
        this.cid,
        this.commentForm.controls.comment.value,
        this.user.uid
      )
    );
  }
}
