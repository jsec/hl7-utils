import t from 'tap';
import { ParserError } from '../lib/errors';
import { getMetadata } from '../lib/parser';

t.beforeEach(t => {
    t.context.message = 'MSH|^~\\&|EPIC|EPICADT|SMS|SMSADT|199912271408|CHARRIS|ADT^A04|1817457|D|2.5';
});

t.afterEach(t => {
    t.context.message = null;
});

t.test('throws a ParserError if the segment is not an MSH segment', t => {
    const segment = t.context.message.replace('MSH', 'PVI') as string;
    t.throws(() => getMetadata(segment), new ParserError({
        name: 'INVALID_SEGMENT',
        message: 'Non-MSH segment found at segment index 0'
    }));
    t.end();
});

t.test('generates message delimiters', t => {
    const message = getMetadata(t.context.message);
    t.equal(message.delimiters, {
        field: '|',
        component: '^',
        repetition: '~',
        escape: '\\',
        subComponent: '&'
    });
    t.end();
});

t.test('sets the message version', t => {
    const message = getMetadata(t.context.message);
    t.equal(message.version, '2.5');
    t.end();
});

t.test('sets the sending and receiving values', t => {
    t.end();
});

t.test('sets the event type and trigger event', t => {
    t.end();
});

t.test('sets the message timestamp', t => {
    const message = getMetadata(t.context.message);
    t.equal(message.timestamp, new Date());
    t.end();
});

t.test('sets the unique message identifier', t => {
    const message = getMetadata(t.context.message);
    t.equal(message.id, '1817457');
    t.end();
});
