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
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.spinnerService.start();
            // case HttpEventType.DownloadProgress:
            //   this.spinnerService.updateProgress(
            //     Math.round((event.loaded / event.total) * 100)
            //   );
            case HttpEventType.Response:
              this.spinnerService.complete();
          }
        },
        (error) => {
          this.spinnerService.complete();
        }
      )
    );
  }
}
