import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  progress: number;
  static total: number = 0;

  done: boolean = false;

  constructor() {}
  start(): void {
    SpinnerService.total++;
  }
  updateProgress(progress: number) {
    this.progress = progress;
  }
  isDone(): boolean {
    return this.done;
  }
  complete(): void {
    SpinnerService.total--;
    this.done = true;
  }
}
