export function randomWithInterval(min: number, max: number) {
    if(min > max) {
        throw Error(`Min value (${ min }) must be lesser than Max value (${ max })`);
    } else if(min === max) {
        return min;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}