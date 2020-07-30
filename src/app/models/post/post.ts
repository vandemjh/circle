import { User } from '../user/user';
import { Comment } from '../comment/comment';
import { Element } from '../element/element';
import { Moment } from 'moment-timezone';

export class Post extends Element {
  constructor(obj?: Post) {
    super();
    if (!!!obj) return;
    this.comments = [];
    this.likes = [];
  }
  location: string;
  imageUrl: string;
  description: string;

  poster: User;
  comments: Comment[];
  likes: User[];

  static sort(a: Post, b: Post): number {
    return a.createdAt.valueOf() - b.createdAt.valueOf();
  }
}

export class PostResponse extends Element {
  constructor(obj?: PostResponse) {
    super();
    // console.log(obj)
    if (!!!obj) {
      Object.assign(this, undefined);
      return;
    }
    this.pid = obj.pid;
    this.post = obj.post;
    this.createdAt = obj.createdAt;
  }
  pid: string;
  post: Post;
}
