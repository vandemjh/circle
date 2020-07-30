import { User } from '../user/user';
import { Comment } from '../comment/comment';
import { Element } from '../element/element'

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
  deserialize<Post>(input: any): Post {
    return undefined
  }
  
  location: string;
  imageUrl: string;
  description: string;
  
  poster: User;
  comments: Comment[];
  likes: User[];
}

export class PostResponse extends Element {
  deserialize<PostResponse>(input: any): PostResponse {
    return undefined;
  }
  pid: string;
  post: Post;
}
