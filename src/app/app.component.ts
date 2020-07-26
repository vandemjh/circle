import { Component, OnInit } from "@angular/core";
import {CircleService} from './services/circle.service'
import {Post} from './classes/post/post';

@Component({
    selector: "circle-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    title = "Circle";
    posts: Post[];
    constructor(private service: CircleService) {}
    
    ngOnInit(): void {
        this.posts = [];
        // this.posts = [
        //     new Post("asdf", "123", "brownsville", "this is description"),
        //     new Post("asdf", "123", "brownsville", "this is description"),
        //     new Post("asdf", "123", "brownsville", "this is description"),
        // ]
    }

    getPosts(): void {
        this.posts = [
            new Post("asdf", "123", "brownsville", "this is description")
        ]
        // this.service.getPosts().subscribe();
    }
}
