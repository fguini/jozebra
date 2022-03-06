import { Cache } from '../../utils/cache-utils';

describe('CacheUtils', () => {
    afterEach(() => {
        Cache.clear();
        jest.restoreAllMocks();
    });

    it('Should return null when nothing cached', () => {
        const cached = Cache.get('FakeKey');

        expect(cached).toBeNull();
    });
    it('Should get value when present in localstorage', () => {
        const key = 'FakeKey';
        const value = { name: 'FakeValue' };
        localStorage.setItem(key, JSON.stringify(value));

        const cached = Cache.get(key);

        expect(cached).toStrictEqual(value);
    });
    it('Should store value on memory cache when retrieved after first time', () => {
        const key = 'FakeKey';
        const value = { name: 'FakeValue' };
        localStorage.setItem(key, JSON.stringify(value));
        jest.spyOn(window.localStorage.__proto__, 'getItem');

        const cached1 = Cache.get(key);
        const cached2 = Cache.get(key);

        expect(cached1).toStrictEqual(value);
        expect(cached2).toStrictEqual(value);
        expect(localStorage.getItem).toBeCalledTimes(1);
    });

    it('Should set value and saved on localStorage', () => {
        const key = 'FakeKey';
        const value = { name: 'FakeValue' };

        const result = Cache.set(key, value);
        const localStorageResult = localStorage.getItem(key);

        expect(result).toBe(value);
        expect(localStorageResult).toBe(JSON.stringify(value));
    });
    it('Should set and get value using cache functions', () => {
        const key = 'FakeKey';
        const value = { name: 'FakeValue' };

        const result = Cache.set(key, value);
        const cached = Cache.get(key);

        expect(cached).toBe(result);
    });
    it('Should overwrite value when setting a value already set', () => {
        const key = 'FakeKey';
        const firstValue = { name: 'FakeValue' };
        const secondValue = { name: 'FakeValue2' };

        const firstResult = Cache.set(key, firstValue);
        const secondResult = Cache.set(key, secondValue);
        const getResult = Cache.get(key);

        expect(firstResult).toStrictEqual(firstValue);
        expect(secondResult).toStrictEqual(secondValue);
        expect(getResult).not.toStrictEqual(firstValue);
        expect(getResult).toStrictEqual(secondValue);
    });

    it('Should remove value when using remove function', () => {
        const key = 'FakeKey';
        const value = { name: 'FakeValue' };

        Cache.set(key, value);
        const firstCached = Cache.get(key);
        Cache.remove(key);
        const secondCached = Cache.get(key);

        expect(firstCached).toStrictEqual(value);
        expect(secondCached).toBeNull();
    });

    it('Should clear all values when clear function is called', () => {
        const values = [ 1, 2, 3, 4, 5 ];
        values.forEach((value) => Cache.set(value.toString(), value));

        Cache.clear();
        const cachedValues = values.map((value) => Cache.get(value.toString()));

        cachedValues.forEach((cached) => {
            expect(cached).toBeNull();
        });
    });
});
