import { ParserError } from './errors';
import { Delimiters, Message, Node } from './interfaces';

function getMetadata(header: string): Message {
    // the first segment must always be an MSH segment, so throw if it is not
    if (header.substring(0, 3) !== 'MSH') {
        throw new ParserError({
            name: 'INVALID_SEGMENT',
            message: 'Non-MSH segment found at segment index 0'
        });
    }

    return null as unknown as Message;
}

function parseField(name: string, text: string, delimiters: Delimiters): Node {
    // if component separator exists,
    // split and map by parseField, with name = name + _[index]
    // if repetition operator exists, split into value

    if (text.length === 0) {
        return {
            name,
            value: null
        };
    }

    if (text.includes(delimiters.component)) {
        return {
            name,
            value: text.split(delimiters.component).map((el, idx) => parseField(`${name}_${idx + 1}`, el, delimiters))
        };
    }

    if (text.includes(delimiters.subComponent)) {
        return {
            name,
            value: text.split(delimiters.subComponent).map((el, idx) => parseField(`${name}_${idx + 1}`, el, delimiters))
        };
    }

    if (text.includes(delimiters.repetition)) {
        return {
            name,
            value: text.split(delimiters.repetition)
        };
    }

    return {
        name,
        value: text
    };
}

export {
    getMetadata,
    parseField
};
