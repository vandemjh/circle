import { User } from '../user/user';
import { Comment } from '../comment/comment';
import { Element } from '../element/element';
import { Moment } from 'moment-timezone';
import * as moment from 'moment';

export class Post extends Element {
  constructor(
    created: string,
    pid: string,
    cid: string,
    lid: string,
    uid: string,
    location: string,
    imageurl: string,
    description: string
  ) {
    super(created);
    this.pid = pid;
    this.cid = cid;
    this.lid = lid;
    this.uid = uid;
    this.location = location;
    this.imageurl = imageurl;
    this.description = description;
  }
  pid: string;
  cid: string;
  lid: string;
  uid: string;
  location: string;
  imageurl: string;
  description: string;

  poster: User;
  comments: Comment[];
  likes: User[];

  static sort(a: Post, b: Post): number {
    if (!!!a) return -1;
    if (!!!b) return 1;
    return a.created.valueOf() - b.created.valueOf();
  }
}
