import { green, grey, yellow } from '@mui/material/colors';

export enum LetterStatus {
    InWord = 'InWord',
    InPlace = 'InPlace',
    NotThere = 'NotThere',
    NotAttempted = 'NotAttempted'
}

export const STATUS_COLOR = {
    [LetterStatus.NotAttempted]: grey.A400,
    [LetterStatus.NotThere]: grey['600'],
    [LetterStatus.InWord]: yellow['800'],
    [LetterStatus.InPlace]: green['600'],
};

export const STATUS_ORDER = [
    LetterStatus.NotAttempted,
    LetterStatus.NotThere,
    LetterStatus.InWord,
    LetterStatus.InPlace
];

export interface Attempt {
    letterStatuses: Array<LetterStatus>;
    word: string;
}

export const FINISHED_WIN = 'Win';
export const FINISHED_DEFEAT = 'Defeat';
export const NOT_FINISHED = false;
export type Finished = typeof FINISHED_WIN | typeof FINISHED_DEFEAT | typeof NOT_FINISHED;

export const BACKSPACE_KEY = 'Backspace';
export const ENTER_KEY = 'Enter';

const spanishLocale = 'es';

const firstRow = 'qwertyuiop'.split('');
const secondRow = 'asdfghjkl'.split('');
const thirdRow = 'zxcvbnm'.split('');

export function getKeyboard(lng: string) {
    const lngSecondRow = [ ...secondRow ];
    if(lng.includes(spanishLocale)) {
        lngSecondRow.push('ñ');
    }

    return [
        firstRow,
        lngSecondRow,
        thirdRow,
    ];
}
