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
    fid: string,
    uid: string,
    location: string,
    iid: string,
    description: string
  ) {
    super(created);
    this.pid = pid;
    this.cid = cid;
    this.fid = fid;
    this.uid = uid;
    this.iid = iid;
    this.location = location;
    this.description = description;
  }
  pid: string;
  cid: string;
  fid: string;
  uid: string;
  location: string;
  iid: string;
  description: string;

  poster: User;
  comments: Comment[];
  favorites: User[];

  static sort(a: Post, b: Post): number {
    return b.created.valueOf() - a.created.valueOf();
  }
}
