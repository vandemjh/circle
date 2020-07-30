import { Moment } from 'moment-timezone';

export abstract class Element {
  createdAt: Moment;
  constructor(obj?: Element) {
    return Object.assign(this, obj);
  }
}
