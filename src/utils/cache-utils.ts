interface CachedData {
    [key: string]: any;
}

class LocalCache {
    cache: CachedData = {};

    get<T>(key: string): T | null {
        const memoryCache = this.cache[key];
        if(memoryCache) return memoryCache;

        const rawCached = localStorage.getItem(key);
        if(!rawCached) return null;

        try {
            const value = JSON.parse(rawCached) as T;
            this.cache[key] = value;
            return value;
        } catch(error) {
            this.remove(key);
            return null;
        }
    }

    set<T>(key: string, value: T): T {
        this.cache[key] = value;
        localStorage.setItem(key, JSON.stringify(value));

        return value;
    }

    remove(key: string): void {
        delete this.cache[key];
        localStorage.removeItem(key);
    }

    clear(): void {
        this.cache = {};
        localStorage.clear();
    }
}

export const Cache = new LocalCache();