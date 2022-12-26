import t from 'tap';
import { parseField } from '../lib/parser';

t.beforeEach(t => {
    t.context.delimiters = {
        field: '|',
        component: '^',
        repetition: '~',
        subComponent: '&',
        escape: '\''
    };
});

t.afterEach(t => {
    t.context.delimiters = null;
});

t.test('name', t => {
    t.test('correctly sets the name for components', t => {
        const result = parseField('parent', 'text', t.context.delimiters);
        t.equal(result.name, 'parent');
        t.end();
    });

    t.test('correctly sets the name for sub-components', t => {
        const result = parseField('parent', 'first^second^third', t.context.delimiters);
        t.same(result, {
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
        t.end();
    });

    t.test('correctly sets the name for sub-sub-components', t => {
        const result = parseField('field', 'first^sub1&sub2', t.context.delimiters);
        t.same(result, {
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
        t.end();
    });

    t.test('correctly sets the name when the field has no value', t => {
        const result = parseField('field', '', t.context.delimiters);
        t.equal(result.name, 'field');
        t.end();
    });

    t.end();
});

t.test('value', t => {
    t.test('correctly parses a plain text field', t => {
        const result = parseField('field', 'sometext', t.context.delimiters);
        t.same(result, {
            name: 'field',
            value: 'sometext'
        });
        t.end();
    });

    t.test('correctly parses sub-components', t => {
        const result = parseField('root', 'one^two^three', t.context.delimiters);
        t.same(result, {
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
        t.end();
    });

    t.test('correctly parses components with repetition characters', t => {
        const result = parseField('field', 'first~second~third', t.context.delimiters);
        t.same(result, {
            name: 'field',
            value: ['first', 'second', 'third']
        });
        t.end();
    });

    t.test('correctly parses sub-components with repetition characters', t => {
        const result = parseField('field', 'first^sub~sub2~sub3^third', t.context.delimiters);
        t.same(result, {
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
        t.end();
    });

    t.test('correctly parses sub-sub-components', t => {
        const result = parseField('field', 'first^sub1&sub2&sub3^third', t.context.delimiters);
        t.same(result, {
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
        t.end();
    });

    t.test('correctly parses a field with no content', t => {
        const result = parseField('field', '', t.context.delimiters);
        t.same(result, {
            name: 'field',
            value: null
        });
        t.end();
    });

    t.end();
});
