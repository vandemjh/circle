import { User } from '../user/user';
import { Comment } from '../comment/comment';
import { Deserializable } from '../deserializable/deserializable';
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
  poster: User;
  location: string;
  imageUrl: string;
  description: string;
  comments: Comment[];
  likes: User[];
}

export class PostResponse extends Element {
  pid: string;
  post: Post;
}