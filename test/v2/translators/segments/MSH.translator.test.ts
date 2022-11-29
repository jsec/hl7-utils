import { readFileSync } from 'fs';
import { expect } from 'chai';
import { MSHTranslator } from '../../../../lib/v2/translators';
import { ParserError } from '../../../../lib/util/errors';

describe('Translators - MSH Segment', () => {
    // TODO: get the MSH segment from the message via Message.getSegment()
    const payload = readFileSync('test/payloads/A08.txt', 'utf8').split('\n')[0];

    describe('MSH.1', () => {
        it('should correctly parse the field separator', () => {
            const control = MSHTranslator.fromHL7(payload);
            expect(control.fieldSeparator).to.equal('|');
        });

        it('should correctly parse the field separator when the separator is non-default', () => {
            const newPayload = payload.replace('|', '@');
            const control = MSHTranslator.fromHL7(newPayload);
            expect(control.fieldSeparator).to.equal('@');
        });

        it('should throw a ParserError when the segment is not an MSH segment', () => {
            const invalidPayload = 'TXA|1234';
            expect(MSHTranslator.fromHL7(invalidPayload)).to.throw(ParserError, 'MSH segment expected, found TXA');
        });
    });

    describe.only('MSH.2', () => {
        it.only('should correctly parse the encoding characters', () => {
            const control = MSHTranslator.fromHL7(payload);
            expect(control.componentSeparator).to.equal('^');
            expect(control.repetitionSeparator).to.equal('~');
            expect(control.escapeCharacter).to.equal('\\');
            expect(control.subcomponentSeparator).to.equal('&');
        });

        it('should throw a ParserError when the field contains too many characters', () => {
            // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'MSH.2 does not contain correct number of characters');
        });

        it('should throw a ParserError when the field contains too few characters', () => {
            // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'MSH.2 does not contain correct number of characters');
        });
    });

    describe('MSH.4', () => {
    });

    describe('MSH.5', () => {
    });

    describe('MSH.6', () => {
    });

    describe('MSH.7', () => {
        console.log('wat');
    });

    describe('MSH.8', () => {
        console.log('wat');
    });

    describe('MSH.9', () => {
        describe('MSH.9.1', () => {
            it('should parse the correct message code', () => {
                const header = MSHTranslator.fromHL7(payload);
                expect(header.messageCode).to.equal('ADT');
            });

            it('should throw a ParserError if the message code does not exist in the standard Message Code table', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'Invalid message code found');
            });

            it('should throw a ParserError if the message code is missing', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'No message code provided');
            });
        });

        describe('MSH.9.2', () => {
            it('should parse the correct trigger event', () => {
                const header = MSHTranslator.fromHL7(payload);
                expect(header.triggerEvent).to.equal('A08');
            });

            it('should throw a ParserError if the trigger event does not exist in the standard Event Type table', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'Invalid trigger event found');
            });

            it('should throw a ParserError if the trigger event is missing', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'No trigger event provided');
            });
        });

        describe('MSH.9.3', () => {
            it('should parse the correct message structure', () => {
                console.log('wat');
            });

            it('should throw a ParserError if the message structure does not exist in the standard Message Structure table', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'Invalid message structure found');
            });

            it('should throw a ParserError if the message structure is missing', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'No message structure provided');
            });
        });
    });

    describe('MSH.10', () => {
        it('should parse the message control id', () => {
            const header = MSHTranslator.fromHL7(payload);
            expect(header.controlId).to.equal('203550');
        });

        it('should throw a ParserError if the control id is missing', () => {
            // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'No message control id found');
        });
    });

    describe('MSH.11', () => {
        describe('MSH.11.1', () => {
            it('should parse the processing id correctly', () => {
                const header = MSHTranslator.fromHL7(payload);
                expect(header.processingId).to.equal('T');
            });

            it('should throw a ParserError if an invalid processing id is provided', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'Invalid processing id provided');
            });

            it('should throw a ParserError if no processing id is provided', () => {
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'No processing id provided');
            });
        });

        describe('MSH.11.2', () => {
            it('should include the processing mode if it is provided', () => {
                const header = MSHTranslator.fromHL7(payload);
                expect(header.processingMode).to.equal('something');
            });

            it('should throw a ParserError if the processing mode contains too many characters', () => {
                console.log('wat');
                // expect(MSHTranslator.fromHL7(payload)).to.throw(ParserError, 'Invalid processing mode provided');
            });

            it('should not throw an error if a processing mode is not provided', () => {
                /* const header = MSHTranslator.fromHL7(payload);
                expect(header.processingMode).to.be.null; */
            });
        });
    });

    describe('MSH.12', () => {
    });
});
