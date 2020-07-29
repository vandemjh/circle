import { User } from '../user/user';
import { Deserializable } from '../deserializable/deserializable';
import { Element } from '../element/element';

export class Comment extends Element {
    commenter: User;
    comment: string;
    constructor(commenter: User, comment: string) {
        super();
        this.comment = comment;
        this.commenter = commenter;
    }
}