import { LetterStatus } from './GameStatusUtils';

export interface Attempt {
    letterStatuses: Array<LetterStatus>;
    word: string;
}

export const FINISHED_WIN = 'Win';
export const FINISHED_DEFEAT = 'Defeat';
export const NOT_FINISHED = false;
export type Finished = typeof FINISHED_WIN | typeof FINISHED_DEFEAT | typeof NOT_FINISHED;
