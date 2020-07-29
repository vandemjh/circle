import { Element } from '../element/element';
import { deserialize } from 'class-transformer';

export class User extends Element {
    constructor(username?: string, firstName?: string, lastName?: string, profilePictureURL?: string) {
        super();
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePictureURL = profilePictureURL;
    }
    username: string;
    firstName: string;
    lastName: string;
    profilePictureURL: string;
    deserialize(input: any) {
        return deserialize<User>(User, JSON.stringify(input));
    }
}
