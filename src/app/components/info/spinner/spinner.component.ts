import { Component, OnInit, Input } from '@angular/core';
import { OnAutoChange } from 'src/app/models/on-auto-change/on-auto-change';

@Component({
  selector: 'circle-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent extends OnAutoChange implements OnInit {
  @Input() progress: number = undefined;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
