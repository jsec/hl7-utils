import { Delimiters, Node } from './interfaces';

function parseMessage(text: string): any {
    return text;
};

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
            value: text.split(delimiters.component).map(c => parseField(name, c, delimiters))
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
    parseMessage,
    parseField
};
