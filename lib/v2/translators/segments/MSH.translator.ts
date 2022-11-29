import { ParserError } from '../../../util/errors';
import { ITranslator, MessageControl } from '../../interfaces';

export const MSHTranslator: ITranslator = {
    fromHL7: (text: string): MessageControl => {
        const segmentType = text.substring(0, 3);

        if (segmentType !== 'MSH') {
            throw new ParserError(`MSH segment expected, found ${segmentType}`);
        }

        const fieldSeparator = text.at(3) as string;

        if (fieldSeparator === '') {
            throw new ParserError('no field separator found');
        }

        const array = text.split(fieldSeparator);
        const control: MessageControl = {
            fieldSeparator,
            componentSeparator: array[1][0],
            repetitionSeparator: array[1][1],
            escapeCharacter: array[1][2],
            subcomponentSeparator: array[1][3],
            messageCode: '',
            triggerEvent: '',
            processingId: '',
            processingMode: '',
            versionId: ''
        };

        return control;
    },
    toHL7: (msg: any): string => {
        return msg.toString();
    }
};
