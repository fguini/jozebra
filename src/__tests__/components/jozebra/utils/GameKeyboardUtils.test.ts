import { getKeyboard } from '../../../../components/jozebra/utils';

describe('GameKeyboardUtils', () => {
    describe('getKeyboard()', () => {
        it('Should return all keys for the keyboard when en language is passed', () => {
            const keys = getKeyboard('en');
            const [ firstRow, secondRow, thirdRow ] = keys;
            const allLetters = [ ...firstRow, ...secondRow, ...thirdRow ];

            expect(keys).toHaveLength(3);
            expect(firstRow).toHaveLength(10);
            expect(secondRow).toHaveLength(9);
            expect(thirdRow).toHaveLength(7);
            expect(allLetters).not.toContain('ñ');
        });
        it('Should return all keys with ñ for the keyboard when es language is passed', () => {
            const keys = getKeyboard('es');
            const [ firstRow, secondRow, thirdRow ] = keys;
            const allLetters = [ ...firstRow, ...secondRow, ...thirdRow ];

            expect(keys).toHaveLength(3);
            expect(firstRow).toHaveLength(10);
            expect(secondRow).toHaveLength(10);
            expect(thirdRow).toHaveLength(7);
            expect(allLetters).toContain('ñ');
        });
    });
});