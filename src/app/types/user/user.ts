export class User {
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
}
