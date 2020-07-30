import { Element } from '../element/element';

export class User extends Element {
    constructor(obj?: User) {
        super();
    }
    username: string;
    firstName: string;
    lastName: string;
    profilePictureURL: string;
}
