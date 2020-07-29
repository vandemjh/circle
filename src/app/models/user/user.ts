import { Deserializable } from '../deserializable/deserializable';
import { Element } from '../element/element';

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
}
