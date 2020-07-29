import { Deserializable } from '../deserializable/deserializable';

export class Element implements Deserializable {
    deserialize(input: any): this {
        console.log(input)
        return undefined;
    }
}
