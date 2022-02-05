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