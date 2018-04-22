import utils from '../../js/helpers/utils';


describe('bemClasses', () => {

    test('no modifiers', () => {

        expect(utils.bemClasses('some-component')).toBe('some-component');
    });

    test('1 string modifier', () => {

        expect(utils.bemClasses('some-component', 'mod')).toBe('some-component some-component--mod');
    });

    test('couple of modifiers in string', () => {

        expect(utils.bemClasses('some-component', 'huge lazy dog'))
            .toBe('some-component some-component--huge some-component--lazy some-component--dog');
    });

    test('empty array', () => {

        expect(utils.bemClasses('some-component', [])).toBe('some-component');
    });

    test('couple of modifiers in array', () => {

        expect(utils.bemClasses('some-component', ['huge', 'lazy', 'dog']))
            .toBe('some-component some-component--huge some-component--lazy some-component--dog');
    });

});

describe('printDate', () => {

    test('returns empty string on bad input', () => {

        expect(utils.printDate()).toBe('');
        expect(utils.printDate(null)).toBe('');
        expect(utils.printDate('something strange')).toBe('');
        expect(utils.printDate(0)).toBe('');
    });

    test('returns correct date on timestamp', () => {

        expect(utils.printDate(1523228045).length).not.toBe(0);
        expect(utils.printDate(1522613051)).toEqual(expect.stringContaining('2018'));
    });

    test('returns correct format', () => {

        expect(utils.printDate(1522613051, 'YYYY-MM-DD')).toEqual('2018-04-01');
    });
});
