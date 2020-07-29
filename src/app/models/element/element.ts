import { Deserializable } from '../deserializable/deserializable';

export class Element implements Deserializable {
    deserialize(input: any): this {
        throw new Error("Method not implemented.");
    }
}
