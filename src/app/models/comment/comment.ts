import { User } from '../user/user';
import { Element } from '../element/element';

export class Comment extends Element {
  commenter: User;
  comment: string;
  constructor(obj?: Comment) {
    super();
    this.comment = obj.comment;
    this.commenter = obj.commenter;
  }
}
