import { User } from '../user/user';

export class Post {
  constructor(
    poster?: User,
    imageUrl?: string,
    location?: string,
    description?: string
  ) {
    this.poster = poster;
    this.imageUrl = imageUrl;
    this.location = location;
    this.description = description;
    this.comments = [];
  }
  poster: User;
  location: string;
  imageUrl: string;
  description: string;
  comments: Comment[];
  likes: string[];
}
