import { isToday } from '../../utils/date-utils';

describe('date utils', () => {
    describe('isToday()', () => {
        it('Should return true when today is passed', () => {
            const today = new Date();

            const result = isToday(today);

            expect(result).toBe(true);
        });
        it('Should return true when other day is passed', () => {
            const notToday = new Date('1905-04-03');

            const result = isToday(notToday);

            expect(result).toBe(false);
        });
    });
});
