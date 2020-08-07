import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from '../../../models/comment/comment';
import { Post } from '../../../models/post/post';
import { CircleService } from 'src/app/services/circle.service';
import { User } from 'src/app/models/user/user';

@Component({
    selector: 'circle-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnChanges {
    /**
     * Logged in user
     */
    @Input() loggedInUser: User;
    @Input() post: Post;
    poster: User;
    favorited: boolean;
    expanded: boolean;

    constructor(private service: CircleService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes.post.currentValue)
        if (changes.post) {
            Object.assign(this.post, changes.post.currentValue);
            // console.log(this.post)
        }
    }

    ngOnInit(): void {
        this.expanded = false;
        // this.favorited = this.getNumberOfLikes();
    }
    
    toggleExpanded(): void {
        this.expanded = !this.expanded;
    }
    isFavorited(): boolean {
        return this.favorited;
    }
    toggleFavorited(): void {
        if (!this.favorited) this.post.likes.push(this.loggedInUser);
        else this.post.likes.splice(this.post.likes.indexOf(this.loggedInUser), 1);
        this.favorited = !this.favorited;
    }
    getNumberOfLikes(): number {
        return !!this.post.likes ? this.post.likes.length : 0;
    }
    getNumberOfComments(): number {
        return 0;
        // return this.post.comments.length;
    }
    numberOfLikesHidden(): boolean {
        return this.getNumberOfLikes() <= 0;
    }
}
