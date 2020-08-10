import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NewPostFormComponent } from '../new-post-form/new-post-form.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'circle-new-post-button',
  templateUrl: './new-post-button.component.html',
  styleUrls: ['./new-post-button.component.css'],
})
export class NewPostButtonComponent implements OnInit, OnChanges {
  @Input() user: User;
  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) this.user = changes.user.currentValue;
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
