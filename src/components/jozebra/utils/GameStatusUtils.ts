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