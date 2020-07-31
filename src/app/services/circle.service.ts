import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post/post';
import { Observable, of } from 'rxjs';
import { User } from '../models/user/user';
import { Comment } from '../models/comment/comment';
import { map } from 'rxjs/operators';
import { Moment } from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class CircleService {
  constructor(private http: HttpClient) {}
  submitPost(toPost: Post): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'posts/', toPost);
  }

  getNewestPosts(time: Moment): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiUrl + 'posts/postedSince/');
  }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.apiUrl + 'posts')
      .pipe(
        map((result: Post[]) =>
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
        )
      );
  }

  /**
   * Returns user object from uid
   * @param uid to retreive user data from
   */
  getUser(uid: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/' + uid);
  }
}
