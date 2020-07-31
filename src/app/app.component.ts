import { Component, OnInit } from '@angular/core';
import { CircleService } from './services/circle.service';
import { Post } from './models/post/post';
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
        // console.log(post instanceof Post)
        this.posts.push(post);
      });
      this.posts.sort(Post.sort);
    });
  }

  onInterval(): void {
    if (!!this.posts[0])
      this.service
        .getNewestPosts(this.posts[0].created)
        .subscribe((postResponse) => {
          this.newPosts = postResponse.length > 0;
          console.log(postResponse.length);
        });
  }

  /**
   * Assigns the current user to the one associated with the logged in user???
   */
  setUser(): void {
    this.service
      .getUser('543da15a-eb74-46ed-b96a-64f45ee0078a')
      .subscribe((user) => {
        this.loggedInUser = new User(
          user.created.toString(),
          user.uid,
          user.username,
          user.firstname,
          user.lastname,
          user.profilePictureURL
        );
      });
  }

  onScroll() {
    this.getPosts();
  }
}
