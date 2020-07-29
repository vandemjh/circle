import { Component, OnInit } from '@angular/core';
import { CircleService } from './services/circle.service';
import { Post, PostResponse } from './models/post/post';
import { User } from './models/user/user';

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
    user: User;
    posts: Post[];
    constructor(private service: CircleService) {}

    ngOnInit(): void {
        this.posts = [];
        this.setUser();
        this.getPosts();
    }

    /**
     * Move this to the service soon
     */
    getPosts(): void {
        this.service.getPosts().subscribe(postResponse => {
            postResponse.forEach(post => {
                this.posts.push(post.post);
                // console.log(this.posts)
            })
        })
    }

    /**
     * Assigns the current user to the one associated with the logged in user???
     */
    setUser(): void {
        this.service.getUser('jack').subscribe((id) => (this.user = id));
    }

    onScroll() {
        this.getPosts();
    }
}
