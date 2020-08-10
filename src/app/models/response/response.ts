export class Response<T> {
    error: string;
    payload: T;
    info: string;
    constructor(obj: Response<T>) {
        Object.assign(this, obj);
    }
}
