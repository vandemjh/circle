import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from '../../models/comment/comment';
import { Post } from '../../models/post/post';
import { CircleService } from 'src/app/services/circle.service';
import { User } from 'src/app/models/user/user';

@Component({
    selector: 'circle-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent extends Post implements OnInit, OnChanges {
    /**
     * Logged in user
     */
    @Input() loggedInUser: User;
    @Input() post: Post;
    poster: User;
    favorited: boolean;
    expanded: boolean;

    constructor(private service: CircleService) {
        super();
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.post.currentValue instanceof Post) {
            // console.log(Object.assign(this, changes.post.currentValue));
            this.deserialize(changes.post.currentValue);
        }
    }

    ngOnInit(): void {
        this.expanded = false;
    }
    
    toggleExpanded(): void {
        this.expanded = !this.expanded;
    }
    isFavorited(): boolean {
        return this.favorited;
    }
    toggleFavorited(): void {
        if (!this.favorited) this.likes.push(this.loggedInUser);
        else this.likes.splice(this.likes.indexOf(this.loggedInUser), 1);
        this.favorited = !this.favorited;
    }
    getNumberOfLikes(): number {
        return !!this.likes ? this.likes.length : 0;
    }
    getNumberOfComments(): number {
        return this.comments.length;
    }
    numberOfLikesHidden(): boolean {
        return this.getNumberOfLikes() <= 0;
    }
}
