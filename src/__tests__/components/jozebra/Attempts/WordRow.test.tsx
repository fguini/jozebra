import React from 'react';
import { render, screen } from '@testing-library/react';
import { WordRow } from '../../../../components/jozebra/Attempts/WordRow';

describe('<WordRow />', () => {
    it('Should render blank when attempt passed', () => {
        const attempt = {
            letterStatuses: [],
            word: '',
        };
        render(<WordRow attempt={ attempt } length={ 5 } tryAnimation={ null }/>);
    });
    it('Should show word in each letter box when attempt passed', () => {
        const word = 'tests';
        const length = word.length;
        const attempt = {
            letterStatuses: [],
            word,
        };

        render(<WordRow attempt={ attempt } length={ length } tryAnimation={ null }/>);

        const letterBoxes = screen.getAllByText(new RegExp(word.split('').join('|')));

        expect(letterBoxes).toHaveLength(length);
    });
});
