import { Deserializable } from '../deserializable/deserializable';

export class User implements Deserializable {
    constructor(username?: string, firstName?: string, lastName?: string, profilePictureURL?: string) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePictureURL = profilePictureURL;
    }
    username: string;
    firstName: string;
    lastName: string;
    profilePictureURL: string;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
