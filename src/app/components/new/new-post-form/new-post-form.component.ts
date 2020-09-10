import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from '../../../models/post/post';
import { CircleService } from '../../../services/circle.service';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { Response } from '../../../models/response/response';

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
    image: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(private circleService: CircleService) {}

  ngOnInit(): void {}

  fileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postForm.get('image').setValue(file);
    }
  }

  onSubmit() {
    var formData = new FormData();
    formData.append('image', this.postForm.get('image').value);

    this.circleService.upload(formData).subscribe((url: Response<string>) => {
      this.circleService
        .submitPost(
          new Post(
            undefined,
            undefined,
            undefined,
            undefined,
            this.user.uid,
            url.payload,
            this.postForm.value.location,
            this.postForm.value.description
          )
        )
        .subscribe((res) => {
          this.submitted.emit(res);
        });
    });
  }
}
