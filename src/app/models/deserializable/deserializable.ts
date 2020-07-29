export interface Deserializable {
    deserialize<T>(input: any): T;
}