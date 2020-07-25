import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from '../../classes/post/post';
import { CircleService } from '../../services/circle.service';

@Component({
  selector: 'circle-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css'],
})
export class NewPostFormComponent implements OnInit {
  toPost: Post;
  postForm = new FormGroup({
    poster: new FormControl(''),
    location: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(private circleService: CircleService) {}

  ngOnInit(): void {
    this.circleService.getPosts().subscribe((x) => console.log(x));
  }
  onSubmit() {
    this.circleService
      .submitPost(new Post(this.postForm.value.imageUrl))
      .subscribe((x) => console.log(x));
  }
}
