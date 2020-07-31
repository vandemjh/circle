import { Moment } from 'moment-timezone';

export abstract class Element {
  created: Moment;
  // constructor();
  constructor(obj?: Element) {
    if (obj) this.created = obj.created;
  }
}
