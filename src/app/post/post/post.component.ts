import { Component, OnInit } from "@angular/core";
import { Comment } from "../../classes/comment/comment";

@Component({
    selector: "circle-post",
    templateUrl: "./post.component.html",
    styleUrls: ["./post.component.css"],
})
export class PostComponent implements OnInit {
    favorited: boolean;
    profilePictureURL: string;
    comments: Comment[];
    likes: string[];
    expanded: boolean;

    constructor() {}

    ngOnInit(): void {
        this.favorited = Math.random() >= 0.5;
        this.profilePictureURL =
            "https://material.angular.io/assets/img/examples/shiba1.jpg";
        this.comments = [];
        this.comments.push(
            new Comment("asdf", "this is a comment"),
            new Comment("asdf", "this is another comment")
        );
        this.likes = ["asdf", "admin"];
        this.expanded = false;
    }

    toggleExpanded(): void {
        this.expanded = !this.expanded;
    }
    isFavorited(): boolean {
        return this.favorited;
    }

    toggleFavorited(): void {
        if (!this.favorited) this.likes.push("user");
        else this.likes.splice(this.likes.indexOf("user"), 1);
        this.favorited = !this.favorited;
    }
    getLikes(): number {
        return this.likes.length;
    }
    getNumberOfComments(): number {
        return this.comments.length;
    }
}
