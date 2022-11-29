import { Segment } from './interfaces';

export default class Message {
    private readonly _text: string;
    public children: Segment[] = [];

    constructor(text: string) {
        this._text = text;
    }

    getSegment(segmentName: string): Segment {
        const segment = this.children.find(c => c.name === segmentName);

        if (segment === null) {
            throw new Error('no segment found');
        }

        return segment;
    }
}
