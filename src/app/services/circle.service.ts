import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../types/post/post';
import { Observable, of } from 'rxjs';
import { User } from '../types/user/user';
import { Comment } from '../types/comment/comment';

@Injectable({
    providedIn: 'root',
})
export class CircleService {
    constructor(private http: HttpClient) {}
    submitPost(toPost: Post): Observable<Post> {
        // console.log(environment.apiUrl + "/posts/")
        // console.log(toPost)
        return this.http.post<Post>(environment.apiUrl + 'posts/', toPost);
    }
    
    getPosts(): Observable<Post[]> {
        // return of([
        //     new Post(
        //         new User(
        //             'username',
        //             'firstname',
        //             'lastname',
        //             'https://material.angular.io/assets/img/examples/shiba1.jpg'
        //         ),
        //         'https://material.angular.io/assets/img/examples/shiba1.jpg',
        //         'location',
        //         'description',
        //         [
        //             new Comment(
        //                 new User(
        //                     'username',
        //                     'firstname',
        //                     'lastname',
        //                     'https://material.angular.io/assets/img/examples/shiba1.jpg'
        //                 ),
        //                 'this is a comment'
        //             ),
        //         ]
        //     ),
        //     new Post(
        //         new User(
        //             'username1',
        //             'firstname1',
        //             'lastname1',
        //             'https://material.angular.io/assets/img/examples/shiba1.jpg'
        //         ),
        //         'https://www.sciencemag.org/sites/default/files/styles/inline__450w__no_aspect/public/dogs_1280p_0.jpg?itok=4t_1_fSJ',
        //         'location1',
        //         'description1',
        //         [
        //             new Comment(
        //                 new User(
        //                     'username',
        //                     'firstname',
        //                     'lastname',
        //                     'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/17140825/Swedish-Vallhund-head-portrait-outdoors.jpg'
        //                 ),
        //                 'this is a comment'
        //             ),
        //             new Comment(
        //                 new User(
        //                     'username',
        //                     'firstname',
        //                     'lastname',
        //                     'https://material.angular.io/assets/img/examples/shiba1.jpg'
        //                 ),
        //                 'this is another comment'
        //             ),
        //         ]
        //     ),
        //     new Post(
        //         new User(
        //             'username2',
        //             'firstname2',
        //             'lastname2',
        //             'https://material.angular.io/assets/img/examples/shiba1.jpg'
        //         ),
        //         'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
        //         'location2',
        //         'description2'
        //     ),
        //     new Post(
        //         new User(
        //             'username3',
        //             'firstname3',
        //             'lastname3',
        //             'https://material.angular.io/assets/img/examples/shiba1.jpg'
        //         ),
        //         'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/17140825/Swedish-Vallhund-head-portrait-outdoors.jpg',
        //         'location3',
        //         'description3',
        //         [
        //             new Comment(
        //                 new User(
        //                     'username',
        //                     'firstname',
        //                     'lastname',
        //                     'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/17140825/Swedish-Vallhund-head-portrait-outdoors.jpg'
        //                 ),
        //                 'this is a comment'
        //             ),
        //             new Comment(
        //                 new User(
        //                     'username1',
        //                     'firstname1',
        //                     'lastname1',
        //                     'https://material.angular.io/assets/img/examples/shiba1.jpg'
        //                 ),
        //                 'this is another comment'
        //             ),
        //         ]
        //     ),
        // ]);


        return this.http.get<Post[]>(environment.apiUrl + "posts");
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
            new User(
                'testUsername',
                'firstname',
                'lastname',
                'https://material.angular.io/assets/img/examples/shiba1.jpg'
            )
        );
        // return this.http.get<User>(environment.apiUrl + userId)
    }
}
