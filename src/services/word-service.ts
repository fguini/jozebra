import { dictionary } from './dictionary';
import { Cache } from '../utils/cache-utils';
import { isToday } from '../utils/date-utils';


export function getWords(): string[] {
    return dictionary;
}

const CACHED_WORD = 'cached-word';

export async function getTodayWord(): Promise<string> {
    const cached = getCachedWord();
    if(cached) return cached;

    const todayIndex = getTodayIndex();
    const words = getWords();
    const todayWord = words[todayIndex];

    return setWordCache(todayWord);
}

interface CachedWord {
    date: Date;
    word: string;
}

function getCachedWord() {
    const cached = Cache.get<CachedWord>(CACHED_WORD);
    if(!cached) return;

    if(!isToday(new Date(cached.date))) {
        Cache.remove(CACHED_WORD);
        return;
    }

    return cached.word;
}

function setWordCache(word: string): string {
    return Cache.set<CachedWord>(CACHED_WORD, {
        date: new Date(),
        word
    }).word;
}

function getTodayIndex(): number {
    const words = getWords();
    const min = 0;
    const max = words.length - 1;

    return Math.floor(Math.random() * (max - min + 1) + min);
}