import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  progress: number;
  done: boolean = false;

  constructor() { }
  updateProgress(progress: number) {
    this.progress = progress;
    console.log(progress)
  }
  isDone(): boolean {
    return this.done;
  }
  complete(): void {
    this.done = true;
  }
}
