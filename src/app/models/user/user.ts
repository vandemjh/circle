import { Element } from '../element/element';
import { CircleService } from 'src/app/services/circle.service';
import { Observable } from 'rxjs';
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
  static getUser(service: CircleService, uid: string): Observable<User> {
    return service.getUser(uid);
  }
  static loggedInUser: User
  uid: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePictureURL: string;
}
