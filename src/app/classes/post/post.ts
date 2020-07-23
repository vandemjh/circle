import { User } from '../user/user';

export class Post {
    constructor(imageUrl: string, posterId?: string, location?: string, description?: string) {
        this.imageUrl = imageUrl;
        this.posterId = posterId;
        this.location = location;
        this.description = description;
    }
    posterId: string;
    location: string;
    imageUrl: string;
    description: string;
}
