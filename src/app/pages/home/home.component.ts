import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { Post } from 'src/app/models/post/post';
import { AuthService } from 'src/app/auth/auth.service';
import { CircleService } from 'src/app/services/circle.service';
import { interval } from 'rxjs';

@Component({
  selector: 'circle-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Circle';
  /**
   * Logged in user.
   */
  user: User;
  posts: Post[];
  newPosts: number;
  isAuthenticated: boolean;
  constructor(private service: CircleService) {}

  ngOnInit(): void {
    // this.auth.getToken().subscribe(val => console.log(val))
    this.newPosts = 0;
    this.posts = [];
    this.setUser();
    this.getPosts();
    interval(10000).subscribe(() => this.onInterval());
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
    this.service
      .getPostsBefore(this.posts[0].getTimestamp())
      .subscribe((postResponse) => {
        this.posts.push(...postResponse);
      });
  }

  /**
   * Assigns the current user to the one associated with the logged in user
   */
  setUser(): void {
    AuthService.getLoggedInUser()
      .subscribe((user: User) => (this.user = user));
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
