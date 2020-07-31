import { User } from '../user/user';
import { Element } from '../element/element';
import { CircleService } from 'src/app/services/circle.service';

export class Comment extends Element {
  cid: string;
  commenter: string;
  comment: string;
  constructor(service: CircleService, created: string, cid: string, comment: string, commenter: string) {
    super(created);
    this.cid = cid;
    this.comment = comment;
    this.commenter = commenter;
  }
}
