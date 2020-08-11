import { User } from '../user/user';
import { Element } from '../element/element';
import { CircleService } from 'src/app/services/circle.service';

export class Comment extends Element {
  cid: string;
  uid: string;
  comment: string;

  commenter: User;
  constructor(created: string, cid: string, comment: string, uid: string) {
    super(created);
    this.cid = cid;
    this.comment = comment;
    this.uid = uid;
  }
}
