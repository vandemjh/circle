import { Component, OnInit } from '@angular/core';
import { CircleService } from './services/circle.service';
import { Post, PostResponse } from './models/post/post';
import { User } from './models/user/user';
import { interval } from 'rxjs';

@Component({
  selector: 'circle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Circle';
  /**
   * Logged in user.
   */
  loggedInUser: User;
  posts: Post[];
  newPosts: boolean;
  constructor(private service: CircleService) {}

  ngOnInit(): void {
    this.newPosts = false;
    this.posts = [];
    this.setUser();
    this.getPosts();
    interval(10000)
    .pipe()
    .subscribe((numberOfSeconds: number) => this.onInterval());
  }

  getPosts(): void {
    this.service.getPosts().subscribe((postResponse) => {
      postResponse.forEach((post) => {
        this.posts.push(post.post);
        // console.log(post.post instanceof Post)
      });
      this.posts.sort(Post.sort);
    });
  }

  onInterval(): void {
    if (!!this.posts[0])
      this.service
        .getNewestPosts(this.posts[0].createdAt)
        .subscribe((postResponse) => {
          this.newPosts = postResponse.length > 0;
          console.log(postResponse.length);
        });
  }

  /**
   * Assigns the current user to the one associated with the logged in user???
   */
  setUser(): void {
    this.service.getUser('jack').subscribe((id) => (this.loggedInUser = id));
  }

  onScroll() {
    this.getPosts();
  }
}
