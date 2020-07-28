import { User } from '../user/user';

export class Comment {
    commenter: User;
    comment: string;
    constructor(commenter: User, comment: string) {
        this.comment = comment;
        this.commenter = commenter;
    }
}
