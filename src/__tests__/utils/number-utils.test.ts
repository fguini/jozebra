import { randomWithInterval } from '../../utils/number-utils';

describe('number utils', () => {
    describe('randomWithInterval()', () => {
        it('Should return number between min and max when min is lesser than max', () => {
            const ranges = [
                {
                    min: 0, max: 100,
                },
                {
                    min: 500, max: 1000,
                },
                {
                    min: -100, max: 50,
                },
            ];

            const results = ranges.map(({ min, max }) => randomWithInterval(min, max));

            results.forEach((result, index) => {
                const { min, max } = ranges[index];
                expect(result).toBeGreaterThanOrEqual(min);
                expect(result).toBeLessThanOrEqual(max);
            });
        });
        it('Should return the number when min and max values are equal', () => {
            const theNumber = 3892;

            const result = randomWithInterval(theNumber, theNumber);

            expect(result).toBe(theNumber);
        });
        it('Should throw error when min value is greater than max value', () => {
            function throwError() {
                randomWithInterval(100, 1);
            }

            expect(throwError).toThrow(Error);
        });
    });
});