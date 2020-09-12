import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProgressInterceptor } from 'src/app/interceptors/progress.interceptor';
import { OnAutoChange } from 'src/app/models/on-auto-change/on-auto-change';

@Component({
  selector: 'circle-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(200)]),
      transition(':leave', animate(100, style({ opacity: 0 }))),
    ]),
  ],
})
export class ProgressBarComponent extends OnAutoChange implements OnInit {
  constructor() {
    super();
  }
  isHidden(): boolean {
    return ProgressInterceptor.getProgress() === 100 ? false : true;
  }
  getValue(): number {
    return ProgressInterceptor.getProgress();
  }

  ngOnInit(): void {}
}
