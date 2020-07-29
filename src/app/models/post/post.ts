import { User } from '../user/user';
import { Comment } from '../comment/comment';
import { Element } from '../element/element'
import { deserialize } from 'class-transformer';

export class Post extends Element {
  constructor(
    poster?: User,
    imageUrl?: string,
    location?: string,
    description?: string,
    comments?: Comment[],
    likes?: User[]
    ) {
      super();
      this.poster = poster;
      this.imageUrl = imageUrl;
      this.location = location;
      this.description = description;
      this.comments = !!comments ? comments : [];
    this.likes = !!likes ? likes : [];
  }
  deserialize(input: any) {
    return deserialize<Post>(Post, JSON.stringify(input))
  }
  poster: User;
  location: string;
  imageUrl: string;
  description: string;
  comments: Comment[];
  likes: User[];
}

export class PostResponse extends Element {
  deserialize(input: any): PostResponse {
    console.log(deserialize<PostResponse>(PostResponse, JSON.stringify(input)));
    return deserialize<PostResponse>(PostResponse, JSON.stringify(input))
  }
  pid: string;
  post: Post;
}
