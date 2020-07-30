import { Moment } from 'moment-timezone';

export class Element {
  createdAt: Moment;
  constructor(obj?: Element) {
    Object.assign(this, obj);
  }
}
