import React from 'react';
import { render, screen } from '@testing-library/react';
import { LetterFalling } from '../../../../../components/jozebra/GameOver/LetterRain/LetterFalling';

describe('<LetterFalling/>', () => {
    it('Should children and with position when always', async () => {
        const testLetter = 'A';
        const basePosition = 48;
        render(<LetterFalling basePosition={ basePosition } time={ 400 }>{ testLetter }</LetterFalling>);

        expect(screen.getByText(testLetter)).toHaveStyle({ left: `${basePosition}%` });
    });
});
