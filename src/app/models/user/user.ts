import { Element } from '../element/element';

export class User extends Element {
  constructor(
    created: string,
    uid: string,
    username: string,
    firstName: string,
    lastName: string,
    profilePictureURL: string
  ) {
    super(created);
    this.uid = uid;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePictureURL = profilePictureURL;
  }
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePictureURL: string;
}
