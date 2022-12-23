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
            it('should correctly set the name for components', () => {
                const result = parseField('parent', 'text', delimiters);
                expect(result.name).to.equal('parent');
            });

            it('should correctly set the name for sub-components', () => {
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

            it('should correctly set the name for sub-sub-components', () => {
                const result = parseField('field', 'first^sub1&sub2', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: [
                        {
                            name: 'field_1',
                            value: 'first'
                        },
                        {
                            name: 'field_2',
                            value: [
                                {
                                    name: 'field_2_1',
                                    value: 'sub1'
                                },
                                {
                                    name: 'field_2_2',
                                    value: 'sub2'
                                }
                            ]
                        }
                    ]
                });
            });

            it('should return the field name even if the field is empty', () => {
                const result = parseField('field', '', delimiters);
                expect(result.name).to.equal('field');
            });
        });

        describe('value', () => {
            it('should correctly parse a plain field', () => {
                const result = parseField('field', 'sometext', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: 'sometext'
                });
            });

            it('should correctly parse sub-components', () => {
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

            it('should correctly parse a component with repetition characters', () => {
                const result = parseField('field', 'first~second~third', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: ['first', 'second', 'third']
                });
            });

            it('should correctly parse a sub-component with repetition characters', () => {
                const result = parseField('field', 'first^sub~sub2~sub3^third', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: [
                        {
                            name: 'field_1',
                            value: 'first'
                        },
                        {
                            name: 'field_2',
                            value: ['sub', 'sub2', 'sub3']
                        },
                        {
                            name: 'field_3',
                            value: 'third'
                        }
                    ]
                });
            });

            it('should correctly parse a sub-sub-component', () => {
                const result = parseField('field', 'first^sub1&sub2&sub3^third', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: [
                        {
                            name: 'field_1',
                            value: 'first'
                        },
                        {
                            name: 'field_2',
                            value: [
                                {
                                    name: 'field_2_1',
                                    value: 'sub1'
                                },
                                {
                                    name: 'field_2_2',
                                    value: 'sub2'
                                },
                                {
                                    name: 'field_2_3',
                                    value: 'sub3'
                                }
                            ]
                        },
                        {
                            name: 'field_3',
                            value: 'third'
                        }
                    ]
                });
            });

            it('should correctly parse a field with no content', () => {
                const result = parseField('field', '', delimiters);
                expect(result).to.deep.equal({
                    name: 'field',
                    value: null
                });
            });
        });
    });
});
