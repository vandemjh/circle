import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from '../../classes/comment/comment';
import { Post } from '../../classes/post/post';

@Component({
    selector: 'circle-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent extends Post implements OnInit, OnChanges {
    /**
     * Logged in user
     */
    @Input() userId: string;
    @Input() post: Post;
    favorited: boolean;
    profilePictureURL: string;
    expanded: boolean;

    constructor() {
        super();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.post.currentValue instanceof Post) {
            this.imageUrl = this.post.imageUrl;
            this.posterId = this.post.posterId;
            this.location = this.post.location;
            this.description = this.post.description;
        }
    }

    ngOnInit(): void {
        this.comments = [];
        this.likes = [];
        this.expanded = false;
        // console.log(this.imageUrl)
        // this.favorited = Math.random() >= 0.5;
        // this.profilePictureURL = "https://material.angular.io/assets/img/examples/shiba1.jpg";
        // this.comments.push(
        //     new Comment("asdf", "this is a comment"),
        //     new Comment("asdf", "this is another comment")
        // );
        // this.likes = ["asdf", "admin"];
    }

    toggleExpanded(): void {
        this.expanded = !this.expanded;
    }
    isFavorited(): boolean {
        return this.favorited;
    }

    toggleFavorited(): void {
        if (!this.favorited) this.likes.push(this.userId);
        else this.likes.splice(this.likes.indexOf(this.userId), 1);
        this.favorited = !this.favorited;
    }
    getLikes(): number {
        return this.likes.length;
    }
    getNumberOfComments(): number {
        return this.comments.length;
    }
    numberOfLikesHidden(): boolean {
        return this.getLikes() <= 0;
    }
}
