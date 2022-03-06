import { Cache } from '../../utils/cache-utils';
import { getTodayWord, getWords } from '../../services/word-service';

describe('WordService', () => {
    describe('getWords()', () => {
        it('Should return a list of words', () => {
            const words = getWords();

            expect(words.length).toBeGreaterThan(1);
            expect(typeof words[0]).toBe('string');
        })
    });

    describe('getTodayWord()', () => {
        let cachedWord: string | null = null;
        afterAll(() => {
           Cache.clear();
        });

        it('Should get today word', async () => {
            const word = await getTodayWord();
            cachedWord = word;

            expect(typeof word).toBe('string');
        });

        it('Should same today word on the second call of the day', async () => {
            const word = await getTodayWord();

            expect(word).toBe(cachedWord);
        });
    });
});