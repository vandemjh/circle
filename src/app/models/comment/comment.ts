import { User } from '../user/user';
import { Element } from '../element/element';
import { deserialize } from 'class-transformer';

export class Comment extends Element {
    commenter: User;
    comment: string;
    constructor(commenter: User, comment: string) {
        super();
        this.comment = comment;
        this.commenter = commenter;
    }
    deserialize(input: any) {
        return deserialize<Comment>(Comment, JSON.stringify(input));
    }
}
