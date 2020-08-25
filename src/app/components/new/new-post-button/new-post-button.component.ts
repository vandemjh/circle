import { Component, OnInit, Input } from '@angular/core';
import { NewPostFormComponent } from '../new-post-form/new-post-form.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user/user';
import { OnAutoChange } from 'src/app/models/on-auto-change/on-auto-change';

@Component({
  selector: 'circle-new-post-button',
  templateUrl: './new-post-button.component.html',
  styleUrls: ['./new-post-button.component.css'],
})
export class NewPostButtonComponent extends OnAutoChange implements OnInit {
  @Input() user: User;
  constructor(private dialog: MatDialog) {
    super();
  }

  openDialog(): void {
    var newPostForm = this.dialog.open(NewPostFormComponent);
    newPostForm.componentInstance.user = this.user;
    newPostForm.componentInstance.submitted.subscribe((closed: boolean) => {
      closed ? newPostForm.close() : null;
    });
  }

  ngOnInit(): void {}
}
