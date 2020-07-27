import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Post } from '../classes/post/post'
import { Observable, of } from 'rxjs';

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
    return of([
      new Post("posterId", "https://material.angular.io/assets/img/examples/shiba1.jpg", "location", "description"),
      new Post("posterId1", "https://www.sciencemag.org/sites/default/files/styles/inline__450w__no_aspect/public/dogs_1280p_0.jpg?itok=4t_1_fSJ", "location1", "description1"),
      new Post("posterId2", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*", "location2", "description2"),
      new Post("posterId3", "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/17140825/Swedish-Vallhund-head-portrait-outdoors.jpg", "location3", "description3")
    ]);
    // return this.http.get<Post[]>(environment.apiUrl + "/posts/");
  }

  getUserId(userId: string): Observable<string> {
    return of("testUserId")
    // return this.http.get<string>(environment.apiUrl + "/" + userId);
  }
}
