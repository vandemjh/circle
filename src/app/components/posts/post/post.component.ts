import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Comment } from '../../../models/comment/comment';
import { Post } from '../../../models/post/post';
import { CircleService } from 'src/app/services/circle.service';
import { User } from 'src/app/models/user/user';
import { OnAutoChange } from '../../../models/on-auto-change/on-auto-change';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'circle-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(400)]),
      transition(':leave', animate(400, style({ opacity: 0 }))),
    ]),
  ],
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
  loaded: boolean;

  constructor(
    private circleService: CircleService,
    private deviceService: DeviceDetectorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loaded = false;
    this.expanded = false;
    this.post.favorites = [];
    // this.favorited = this.getNumberOffavorites();
    this.circleService
      .getComments(this.post.cid)
      .subscribe((comments: Comment[]) => (this.post.comments = comments));
    this.circleService
      .getUserByUID(this.post.uid)
      .subscribe((poster: User) => (this.poster = poster));
    this.getFavorites();
  }

  getMobileStyle(): object {
    return this.deviceService.isMobile()
      ? { 'max-width': '100%' }
      : { 'max-width': '60%' };
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
      this.circleService
        .postFavorite(this.user.uid, this.post.fid)
        .subscribe((resp: boolean) => {
          if (!resp) console.warn('error submitting like');
        });
    else console.warn('post not loaded yet!', this.post, this.user);
  }

  getFavorites(): void {
    if (this.post && this.user)
      this.circleService
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

  getImageUrl() {
    return this.circleService.getImageUrl(this.post);
  }
  setLoaded(): void {
    this.loaded = true;
  }
  isLoaded(): boolean {
    return !!this.post.iid && this.loaded;
  }
}
