import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../models/comment/comment';
import { FormGroup, FormControl } from '@angular/forms';
import { CircleService } from 'src/app/services/circle.service';
import { User } from 'src/app/models/user/user';
import { OnAutoChange } from 'src/app/models/on-auto-change/on-auto-change';
import { Observable } from 'rxjs';

@Component({
  selector: 'circle-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent extends OnAutoChange implements OnInit {
  // cid for this post
  @Input() cid: string;
  @Input() user: User;
  @Input() comments: Comment[];
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
  constructor(private circleService: CircleService) {
    super();
  }
  ngOnInit(): void {
    this.getCommenters();
  }

  getCommenters(): void {
    if (this.comments) this.comments.forEach((comment: Comment) =>
      this.circleService
        .getUserByUID(comment.uid)
        .subscribe(
          (user: User) => (comment.commenter = user ? user : undefined)
        )
    );
  }

  submitComment(): void {
    this.circleService.postComment(
      new Comment(
        undefined,
        this.cid,
        this.commentForm.controls.comment.value,
        this.user.uid
      )
    )
    .subscribe((ret: boolean) => {
      console.log(ret);
    });
  }
}
