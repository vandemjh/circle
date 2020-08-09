import { Element } from '../element/element';
import { CircleService } from 'src/app/services/circle.service';
import { Observable } from 'rxjs';
export class User extends Element {
  constructor(
    uid: string,
    username: string,
    logins: string,
    sub: string,
    email: string,
    picture: string,
    name: string,
    email_verified: string,
    family_name: string,
    given_name: string,
    locale: string,
    nickname: string,
    created: string
  ) {
    super(created);
    this.uid = uid;
    this.username = username;
    this.logins = logins;
    this.sub = sub;
    this.email = email;
    this.picture = picture;
    this.name = name;
    this.email_verified = email_verified;
    this.family_name = family_name;
    this.given_name = given_name;
    this.locale = locale;
    this.nickname = nickname;
  }
  uid: string;
  username: string;
  logins: string;
  sub: string;
  email: string;
  picture: string;
  name: string;
  email_verified: string;
  family_name: string;
  given_name: string;
  locale: string;
  nickname: string;
}
