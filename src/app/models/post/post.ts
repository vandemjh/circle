import { User } from '../user/user';
import { Comment } from '../comment/comment';
import { Element } from '../element/element';
import { Moment } from 'moment-timezone';
import * as moment from 'moment';

export class Post extends Element {
  constructor(obj?: Post) {
    super(obj);
    if (!!!obj) return;
    console.log(obj)
  }
  location: string;
  imageUrl: string;
  description: string;

  poster: User;
  comments: Comment[];
  likes: User[];
  deserialize(obj: Post): Post {
    return Object.assign(this, obj)
  }
  static sort(a: Post, b: Post): number {
    if (!!!a) return -1;
    if (!!!b) return 1;
    return a.created.valueOf() - b.created.valueOf();
  }
}

export class PostResponse extends Element {
  constructor(obj?: PostResponse) {
    // console.log("At post:34")
    super(obj);
    // console.log(obj)
    this.pid = obj.pid;
    this.post = new Post(obj.post);
    // console.log(this.post)
  }
  pid: string;
  post: Post;
}
