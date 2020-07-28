import { User } from '../user/user';
import { Comment } from '../comment/comment';

export class Post {
  constructor(
    poster?: User,
    imageUrl?: string,
    location?: string,
    description?: string,
    comments?: Comment[],
    likes?: User[]
  ) {
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
