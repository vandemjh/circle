import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment } from '../../classes/comment/comment';
import { Post } from '../../classes/post/post';
import { CircleService } from 'src/app/services/circle.service';
import { User } from 'src/app/classes/user/user';

@Component({
    selector: 'circle-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})
export class PostComponent extends Post implements OnInit, OnChanges {
    /**
     * Logged in user
     */
    @Input() user: User;
    @Input() post: Post;
    poster: User;
    favorited: boolean;
    expanded: boolean;

    constructor(private service: CircleService) {
        super();
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.post.currentValue instanceof Post) {
            this.poster = this.post.poster;
            this.imageUrl = this.post.imageUrl;
            this.location = this.post.location;
            this.description = this.post.description;
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
        if (!this.favorited) this.likes.push(this.user);
        else this.likes.splice(this.likes.indexOf(this.user), 1);
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
