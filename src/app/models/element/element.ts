import { Moment } from 'moment-timezone';
import * as moment from 'moment';

export abstract class Element {
  created: Moment;
  constructor(created: string) {
    if (created) this.created = moment(created);
  }

  // getTimestamp(): string {
  //   return this.created.toISOString();
  // }

  /**
   * Either moment or backend rounds the timestamps, this evens it out
   */
  getRoughEstimate(): string {
    return moment(this.created.valueOf() + 1).toISOString();
  }

  getRoughEstimateAfter(): string {
    return moment(this.created.valueOf() - 1).toISOString();
  }
}
