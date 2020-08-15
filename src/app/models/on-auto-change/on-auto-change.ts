import { OnChanges, SimpleChanges, Directive } from '@angular/core';

@Directive()
export class OnAutoChange implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // This shouldn't be too slow since it's looping through changes
    // and changes object only has 1 to 3 props.
    Object.getOwnPropertyNames(changes)
      .filter((prop: string) => Object.getOwnPropertyNames(this).includes(prop))
      .forEach((prop) => (this[prop] = changes[prop].currentValue));
  }
}
