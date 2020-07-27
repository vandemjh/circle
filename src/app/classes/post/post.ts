import { User } from '../user/user';

export class Post {
    constructor(posterId?: string, imageUrl?: string, location?: string, description?: string) {
        this.imageUrl = imageUrl;
        this.posterId = posterId;
        this.location = location;
        this.description = description;
    }
    posterId: string;
    location: string;
    imageUrl: string;
    description: string;
    comments: Comment[];
    likes: string[];
}
