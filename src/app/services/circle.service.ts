import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostResponse } from '../models/post/post';
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

  getNewestPosts(time: Moment): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(
      environment.apiUrl + 'posts/postedSince/'
    );
  }

  getPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(environment.apiUrl + 'posts').pipe(
      map((result) => {
        (result as PostResponse[]).forEach((item: PostResponse) => {
          // console.log(item);
          item = new PostResponse(item);
        });
        return result;
      })
    );
  }

  getUserId(userId: string): Observable<string> {
    return of('testUserId');
    // return this.http.get<string>(environment.apiUrl + userId);
  }

  /**
   * Returns user object from userId
   * @param userId to retreive user data from
   */
  getUser(userId: string): Observable<User> {
    return of(
      new User({
        username: 'testUsername',
        firstName: 'firstname',
        lastName: 'lastname',
        profilePictureURL:
          'https://material.angular.io/assets/img/examples/shiba1.jpg',
        created: undefined,
      })
    );
    // return this.http.get<User>(environment.apiUrl + userId)
  }
}
