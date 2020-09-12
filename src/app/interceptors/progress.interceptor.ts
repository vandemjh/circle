import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  static requests: number = 0;
  static completeRequests: number = 0;
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              ProgressInterceptor.start();
              break;
            case HttpEventType.Response:
              ProgressInterceptor.complete();
              break;
            default:
              break;
          }
        },
        (error) => {
          ProgressInterceptor.complete();
        }
      )
    );
  }
  static start(): void {
    ProgressInterceptor.requests++;
  }
  static complete(): void {
    ProgressInterceptor.completeRequests++;
  }

  static getProgress(): number {
    return (ProgressInterceptor.completeRequests / ProgressInterceptor.requests) * 100;
  }
}
