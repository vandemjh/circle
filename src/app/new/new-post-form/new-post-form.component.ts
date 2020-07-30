import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from '../../models/post/post';
import { CircleService } from '../../services/circle.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'circle-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css'],
})
export class NewPostFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<boolean>();
  user: User;
  postForm = new FormGroup({
    poster: new FormControl(''),
    location: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(private circleService: CircleService) {}

  ngOnInit(): void {}
  onSubmit() {
    this.circleService
      .submitPost(new Post(
        this.user, 
        this.postForm.value.imageUrl,
        this.postForm.value.location,
        this.postForm.value.description,
        [],
        []
        ))
      .subscribe(res => {
        this.submitted.emit(res);
      });
  }
}
