import { Deserializable } from '../deserializable/deserializable';

export abstract class Element implements Deserializable {
    abstract deserialize(input: any);
}
