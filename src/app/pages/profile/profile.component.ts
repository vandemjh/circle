import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user/user';
import { ActivatedRoute, Params } from '@angular/router';
import { CircleService } from 'src/app/services/circle.service';
import { Post } from 'src/app/models/post/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User; //Logged in User
  profile: User;
  posts: Post[] = undefined;

  constructor(private route: ActivatedRoute, private service: CircleService) {
    this.route.queryParams.subscribe((param: Params) =>
      service
        .getUserByUsername(Object.keys(param)[0])
        .subscribe((ret: User) => {
          this.profile = ret;
          if (ret)
            this.service.getPostsByUID(ret.uid).subscribe((posts: Post[]) => {
              this.posts = [];
              this.posts.push(...posts);
            });
        })
    );
  }

  setUser(): void {
    AuthService.getLoggedInUser().subscribe((user: User) => (this.user = user));
  }

  getPosts(): void {
    this.service.getPosts();
  }

  ngOnInit() {
    this.setUser();
  }
}
