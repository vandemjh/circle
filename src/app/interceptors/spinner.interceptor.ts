import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // if (req.reportProgress) {
    // only intercept when the request is configured to report its progress
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.DownloadProgress) {
            // here we get the updated progress values, call your service or what ever here
            this.spinnerService.updateProgress(
              Math.round((event.loaded / event.total) * 100)
            ); // display & update progress bar
          } else if (event.type === HttpEventType.Response) {
            this.spinnerService.complete();
          }
        },
        (error) => {
          this.spinnerService.complete();
        }
      )
    );
    // } else {
    //   return next.handle(req);
  }
}
