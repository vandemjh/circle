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

    getPosts(): void {
        this.service.getPosts().subscribe(posts => this.posts.push(...posts));
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
