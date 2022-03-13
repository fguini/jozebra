import React from 'react';
import { render, screen } from '@testing-library/react';
import { LetterRain } from '../../../../../components/jozebra/GameOver/LetterRain/LetterRain';

describe('<LetterRain/>', () => {
    it('Should rain fall down when is a sad day', async () => {
        const textPrefix = 'app.gameOver.rain.';

        render(<LetterRain/>);

        const lettersFalling = textPrefix.split('').map((letter) => screen.getAllByText(letter));
        const [ [ firstLetter ] ] = lettersFalling;

        expect(firstLetter).toBeInTheDocument();
    });
});