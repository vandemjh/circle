import { Component, OnInit } from "@angular/core";
import {CircleService} from './services/circle.service'
import {Post} from './classes/post/post';

@Component({
    selector: "circle-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    title = "Circle";
    userId: string = "jack";
    posts: Post[];
    constructor(private service: CircleService) {}
    
    ngOnInit(): void {
        this.posts = [];
        this.setUserId();
        this.getPosts();
    }

    getPosts(): void {
        this.service.getPosts().subscribe(posts => this.posts = posts);
    }

    /**
     * Assigns the current userId to the one associated with the logged in user???
     */
    setUserId(): void {
        this.service.getUserId(this.userId).subscribe(id => this.userId = id);
    }
}
