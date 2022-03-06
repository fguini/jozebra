import { Cache } from '../../utils/cache-utils';
import { getAttempts, addAttempt } from '../../services/attempt-service';

describe('attempt service', () => {
    describe('getAttempts()', () => {
        afterEach(() => {
            Cache.clear();
        });
        it('Should return empty list when no attempts tried', async () => {
            const attempts = await getAttempts();

            expect(attempts).toHaveLength(0);
        });
        it('Should attempt list when one time attempted', async () => {
            const value = 'FakeAttempt';
            await addAttempt(value);

            const attempts = await getAttempts();
            const [ firstAttempt ] = attempts;

            expect(attempts).toHaveLength(1);
            expect(firstAttempt).toBe(value);
        });
        it('Should attempt list when more than one time attempted', async () => {
            const value = 'FakeAttempt';
            const length = 5;
            for(let i = length; i--;) {
                await addAttempt(value);
            }

            const attempts = await getAttempts();
            const [ firstAttempt ] = attempts;

            expect(attempts).toHaveLength(length);
            expect(firstAttempt).toBe(value);
        });
    });
    describe('addAttempt()', () => {
        let length: number = 0;

        async function addAttemptAndAdd(attempt: string) {
            length = length + 1;
            return await addAttempt(attempt);
        }

        afterAll(() => {
            Cache.clear();
        });
        it('Should return added attempts and save it on cache', async () => {
            const value = 'FakeAttempt';

            const result = await addAttemptAndAdd(value);
            const [ attempt ] = await getAttempts();

            expect(result).toBe(value);
            expect(attempt).toBe(attempt);
        });
        it('Should be cached and add a new one', async () => {
            const value = 'FakeAttempt';

            const result = await addAttemptAndAdd(value);
            const attempts = await getAttempts();

            expect(result).toBe(value);
            expect(attempts).toHaveLength(length);
        });
    });
});
