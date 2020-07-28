export class Comment {
    commenterId: string;
    comment: string;
    constructor(commenterId: string, comment: string) {
        this.comment = comment;
        this.commenterId = commenterId;
    }
}
