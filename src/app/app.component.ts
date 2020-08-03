import { Component, OnInit } from '@angular/core';
import { CircleService } from './services/circle.service';
import { Post } from './models/post/post';
import { User } from './models/user/user';
import { interval } from 'rxjs';
import {OktaAuthService} from './services/okta.service'

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
  newPosts: number;
  isAuthenticated: boolean;
  constructor(public oktaAuth: OktaAuthService, private service: CircleService) {}

  ngOnInit(): void {
    this.oktaAuth.$isAuthenticated.subscribe(auth => {
      console.log("Authenticated? : " + this.isAuthenticated)
      this.isAuthenticated = auth});
    
    this.newPosts = 0;
    this.posts = [];
    this.setUser();
    this.getPosts();
    interval(10000)
      .pipe()
      .subscribe((numberOfSeconds: number) => this.onInterval());
  }

  getPosts(): void {
    this.service.getPosts().subscribe((postResponse) => {
      this.posts.push(...postResponse);
      this.posts.sort(Post.sort);
    });
  }

  onInterval(): void {
    if (!!this.posts[0])
      this.service
        .getPostsBefore(this.posts[0].created.format().toString())
        .subscribe((postResponse) => {
          this.newPosts = postResponse.length;
        });
  }

  getNewPosts(): void {
    this.service.getPostsBefore(this.posts[0].getTimestamp())
    .subscribe((postResponse) => {
      this.posts.push(...postResponse)
    });
  }

  /**
   * Assigns the current user to the one associated with the logged in user???
   */
  setUser(): void {
    this.service
      .getUser('bfe6e19b-859e-4080-84d1-cf69fbea6451')
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
    this.service
      .getPostsAfter(this.posts[this.posts.length - 1].getTimestamp())
      .subscribe((postResponse) => {
        this.posts.push(...postResponse);
        this.posts.sort(Post.sort);
      });
      // console.log(this.posts)
  }
}
