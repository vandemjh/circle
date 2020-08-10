import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Post } from '../models/post/post';
import { Observable, of, OperatorFunction } from 'rxjs';
import { User } from '../models/user/user';
import { Comment } from '../models/comment/comment';
import { map } from 'rxjs/operators';
import { Moment } from 'moment-timezone';
import { AuthService } from '../auth/auth.service';
import { Auth0ClientOptions } from '@auth0/auth0-spa-js';
import {Response} from '../models/response/response'

@Injectable({
  providedIn: 'root',
})
export class CircleService {
  constructor(private http: HttpClient) {}
  submitPost(toPost: Post): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'posts/', toPost);
  }

  getSecrets(): Observable<Auth0ClientOptions> {
    return this.http.get<Auth0ClientOptions>(environment.apiUrl + 'secrets');
  }

  getPostsBefore(time: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.apiUrl + 'posts/postedBefore/' + time)
      .pipe(CircleService.deserialize());
  }

  getPostsAfter(time: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.apiUrl + 'posts/postedAfter/' + time)
      .pipe(CircleService.deserialize());
  }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.apiUrl + 'posts')
      .pipe(CircleService.deserialize());
  }

  login(obj: object): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'login', obj);
  }

  /**
   * Returns user object from uid
   * @param uid to retreive user data from
   */
  getUserByUID(uid: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/' + uid);
  }

  /**
   * Returns user object from sub
   * @param sub to retreive user data from
   */
  getUserBySub(sub: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/sub/' + sub);
  }

  upload(data): Observable<Response<string>> {
    return this.http
      .post<any>(`${environment.apiUrl}upload`, data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }

  private static deserialize(): OperatorFunction<Post[], Post[]> {
    return map((result: Post[]) =>
      result.map(
        (item: Post) =>
          new Post(
            item.created.toString(),
            item.pid,
            item.cid,
            item.lid,
            item.uid,
            item.location,
            item.imageurl,
            item.description
          )
      )
    );
  }
}
