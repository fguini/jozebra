import { FINISHED_DEFEAT, FINISHED_WIN } from './GameGeneralUtils';

export const TRY_ANIMATION_ATTEMPT = 'Attempt';
export const TRY_ANIMATION_DEFEAT = FINISHED_DEFEAT;
export const TRY_ANIMATION_WIN = FINISHED_WIN;
export const TRY_ANIMATION_WRONG = 'Wrong';
export type TryAnimation = typeof TRY_ANIMATION_ATTEMPT
    | typeof TRY_ANIMATION_DEFEAT
    | typeof TRY_ANIMATION_WIN
    | typeof TRY_ANIMATION_WRONG
    | null;


export interface Animation {
    count?: number;
    name: string;
    time: number;
}

interface AnimationsInformation {
    [key: string]: Animation;
}

export const Animations: AnimationsInformation = {
    [TRY_ANIMATION_ATTEMPT]: {
        name: 'AttemptAnimation',
        time: 500,
        count: 2
    },
    [TRY_ANIMATION_DEFEAT]: {
        name: 'DefeatAnimation',
        time: 2000
    },
    [TRY_ANIMATION_WIN]: {
        name: 'WinAnimation',
        time: 2000
    },
    [TRY_ANIMATION_WRONG]: {
        name: 'WrongAnimation',
        time: 2000
    }
}