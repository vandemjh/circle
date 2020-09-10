import { Component, OnInit, Input } from '@angular/core';
import { OnAutoChange } from 'src/app/models/on-auto-change/on-auto-change';

@Component({
  selector: 'circle-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent extends OnAutoChange implements OnInit {
  @Input() error: string;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
