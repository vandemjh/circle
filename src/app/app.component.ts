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
        this.posts.push(new Post(post.created.toString(), post.pid, post.cid, post.lid, post.uid));
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
    this.service.getUser('00c1e23e-4e7a-4596-962e-f38a9d58913e').subscribe((id) => (this.loggedInUser = id));
  }

  onScroll() {
    this.getPosts();
  }
}
