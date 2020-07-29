import { User } from '../user/user';
import { Deserializable } from '../deserializable/deserializable';

export class Comment implements Deserializable {
    commenter: User;
    comment: string;
    constructor(commenter: User, comment: string) {
        this.comment = comment;
        this.commenter = commenter;
    }
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
