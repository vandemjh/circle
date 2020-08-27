import {
  Component,
  OnInit,
  Input,
  SimpleChanges
} from '@angular/core';
import { Comment } from '../../../models/comment/comment';
import { Post } from '../../../models/post/post';
import { CircleService } from 'src/app/services/circle.service';
import { User } from 'src/app/models/user/user';
import { OnAutoChange } from '../../../models/on-auto-change/on-auto-change';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'circle-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent extends OnAutoChange implements OnInit {
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

  ngOnInit(): void {
    this.expanded = false;
    this.post.favorites = [];
    // this.favorited = this.getNumberOffavorites();
    this.service
      .getComments(this.post.cid)
      .subscribe((comments: Comment[]) => (this.post.comments = comments));
    this.service
      .getUserByUID(this.post.uid)
      .subscribe((poster: User) => (this.poster = poster));
    this.getFavorites();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.getFavorites();
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
  isFavorited(): boolean {
    return this.favorited;
  }

  toggleFavorited(): void {
    if (!this.favorited) this.post.favorites.push(this.user);
    else this.post.favorites.splice(this.post.favorites.indexOf(this.user), 1);
    this.favorited = !this.favorited;
    if (this.user && this.post)
      this.service
        .postFavorite(this.user.uid, this.post.fid)
        .subscribe((resp: boolean) => {
          if (!resp) console.warn('error submitting like');
        });
    else console.warn('post not loaded yet!', this.post, this.user);
  }

  getFavorites(): void {
    if (this.post && this.user)
      this.service
        .getFavorites(this.post.fid)
        .subscribe((favoriters: User[]) => {
          this.post.favorites = favoriters;
          // console.log(this.post)
          this.favorited = this.post.favorites
            .map((v) => v.uid)
            .includes(this.user.uid);
        });
  }

  getNumberOfFavorites(): number {
    return !!this.post.favorites ? this.post.favorites.length : 0;
  }
  getNumberOfComments(): number {
    return this.post && this.post.comments ? this.post.comments.length : 0;
  }
  numberOfFavoritesHidden(): boolean {
    return this.getNumberOfFavorites() <= 0;
  }

  getPostUrl() {
    return `${environment.apiUrl}images/${this.post.iid}`
  }
}
