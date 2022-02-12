import { Cache } from '../utils/cache-utils';
import { isToday } from '../utils/date-utils';

const CACHED_ATTEMPTS = 'attempts';

export async function getAttempts() {
    return getCachedAttempts() || [];
}

interface CachedAttempts {
    attempts: Array<string>;
    date: Date;
}

function getCachedAttempts() {
    const cached = Cache.get<CachedAttempts>(CACHED_ATTEMPTS);
    if(!cached) return;

    if(!isToday(new Date(cached.date))) {
        Cache.remove(CACHED_ATTEMPTS);
        return;
    }

    return cached.attempts;
}

export async function addAttempt(attempt: string) {
    const cached = getCachedAttempts() || [];
    const attempts = [ ...cached, attempt ];

    Cache.set(CACHED_ATTEMPTS, {
        date: new Date(),
        attempts
    });

    return attempt;
}