import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  @Input() user: User;
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
    this.service
      .getComments(this.post.cid)
      .subscribe((comments: Comment[]) => (this.post.comments = comments));
    this.service
      .getUserByUID(this.post.uid)
      .subscribe((poster: User) => (this.poster = poster));
    this.service
      .getLikes(this.post.lid)
      .subscribe((likers: User[]) => (this.post.likes = likers));
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  isFavorited(): boolean {
    return this.favorited;
  }
  toggleFavorited(): void {
    if (!this.favorited) this.post.likes.push(this.user);
    else this.post.likes.splice(this.post.likes.indexOf(this.user), 1);
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
