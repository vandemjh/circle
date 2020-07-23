import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Post } from '../classes/post/post'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(private http: HttpClient) { }
  submitPost(toPost: Post): Observable<any> {
    // console.log(environment.apiUrl + "/posts/")
    return this.http.post<Post>(environment.apiUrl + "/posts/", toPost);
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiUrl + "/posts/");
  }
}
