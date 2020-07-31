import { Element } from '../element/element';

export class User extends Element {
  constructor(
    created: string,
    uid: string,
    username: string,
    firstname: string,
    lastname: string,
    profilePictureURL: string
  ) {
    super(created);
    this.uid = uid;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.profilePictureURL = profilePictureURL;
  }
  uid: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePictureURL: string;
}
