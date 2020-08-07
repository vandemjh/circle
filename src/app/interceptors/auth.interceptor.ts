import { Injectable, Injector, Inject, forwardRef } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService;
  constructor(private inj: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Do not try to use a token to authenticate secrets since constructing an AuthService
    // requires an http client which requires this method creating a circular dependacy
    if (request.url.includes('/secrets')) return next.handle(request);

    this.authService = this.inj.get(AuthService);
    var toReturn = new Promise<HttpEvent<unknown>>((resolve, reject) => {
      this.authService.getToken().subscribe((val) => {
        resolve(
          next
            .handle(
              request.clone({
                setHeaders: {
                  Authorization: `Bearer ${val}`,
                },
              })
            )
            .toPromise()
        );
      });
    });
    return from(toReturn);

    // this.authService.getToken().toPromise().then(token => {

    return next.handle(request);

    // return from(
    //   new Promise<HttpEvent<unknown>>((resolve, reject) => {
    //     console.log("1")
    //     this.authService.getToken().toPromise().then(token => {
    //       console.log("2")
    //       header = request.clone({
    //         setHeaders: {
    //           // 'Content-Type' : 'application/json; charset=utf-8',
    //           // 'Accept'       : 'application/json',
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       console.log("3")
    //     }).then(() => {
    //       console.log("4")
    //       return next.handle(header)
    //       console.log("5")
    //       // resolve()
    //     }).then(() => {
    //       console.log("6")
    //       resolve()
    //       console.log("7")
    //     })
    //   })
    // )
  }
}
