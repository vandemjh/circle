import { User } from '../user/user';

export class Post {
    constructor(poster?: User, imageUrl?: string, location?: string, description?: string) {
        this.imageUrl = imageUrl;
        this.poster = poster;
        this.location = location;
        this.description = description;
    }
    poster: User;
    location: string;
    imageUrl: string;
    description: string;
    comments: Comment[];
    likes: string[];
}
