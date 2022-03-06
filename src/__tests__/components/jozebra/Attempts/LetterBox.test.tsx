import React from 'react';
import { render, screen } from '@testing-library/react';
import { LetterBox } from '../../../../components/jozebra/Attempts/LetterBox';

describe('<LetterBox />', () => {
    it('Should render blank when no letter and status passed', () => {
        render(<LetterBox tryAnimation={null} />);
    });

    it('Should render with letter when letter passed', () => {
        const letter = 'A';
        render(<LetterBox letter={ letter } tryAnimation={null} />);

        const letterBox = screen.getByText(letter);

        expect(letterBox).toBeInTheDocument();
    });
});