import { expect } from 'chai';
import { Delimiters } from '../lib/interfaces';
import { parseField } from '../lib/parser';

describe('Parser', () => {
    const delimiters: Delimiters = {
        field: '|',
        component: '^',
        repetition: '~',
        subComponent: '&',
        escape: '\''
    };

    describe('Field', () => {
        describe('name', () => {
            it('should set the name of a sub-field based on the parent segment, field sequence number, and sub-field sequence number', () => {
                const result = parseField('parent', 'first^second^third', delimiters);
                expect(result).to.deep.equal({
                    name: 'parent',
                    value: [
                        {
                            name: 'parent_1',
                            value: 'first'
                        },
                        {
                            name: 'parent_2',
                            value: 'second'
                        },
                        {
                            name: 'parent_3',
                            value: 'third'
                        }
                    ]
                });
            });

            it('should set the name even if the field value does not exist', () => {
                const result = parseField('field', '', delimiters);
                expect(result.name).to.equal('field');
            });
        });

        describe('value', () => {
            it('should be the field text if there are no sub-field delimiters present', () => {
                const result = parseField('field', 'sometext', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: 'sometext'
                });
            });

            it('should be an array of sub-fields if sub-field delimiters are present', () => {
                const result = parseField('root', 'one^two^three', delimiters);
                expect(result).to.deep.equal({
                    name: 'root',
                    value: [
                        {
                            name: 'root_1',
                            value: 'one'
                        },
                        {
                            name: 'root_2',
                            value: 'two'
                        },
                        {
                            name: 'root_3',
                            value: 'three'
                        }
                    ]
                });
            });

            it('should be an array of values if the repetition delimiter is present', () => {
                const result = parseField('field', 'first~second~third', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: ['first', 'second', 'third']
                });
            });

            it('should be an array of values for a sub-field', () => {
                console.log('wat');
            });

            it('should be null if no text is present', () => {
                const result = parseField('field', '', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: null
                });
            });
        });
    });
});
