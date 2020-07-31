import { Moment } from 'moment-timezone';
import * as moment from 'moment';

export abstract class Element {
  created: Moment;
  constructor(created: string) {
    if (created) this.created = moment(created);
  }
}
