import React from 'react';
import { render, screen } from '@testing-library/react';
import { WordAttempts } from '../../../../components/jozebra/Attempts/WordAttempts';

describe('<WordAttempts />', () => {
    it('Should render blank row when no attempts passed', () => {
        render(
            <WordAttempts
                attempts={ [] }
                currentWord=""
                quantity={ 6 }
                wordLength={ 5 }
                tryAnimation={ null }
            />
        );
    });
    it('Should show word in each letter box when current word is passed', () => {
        const currentWord = 'tests';
        render(
            <WordAttempts
                attempts={ [] }
                currentWord={ currentWord }
                quantity={ 6 }
                wordLength={ 5 }
                tryAnimation={ null }
            />
        );

        const letterBoxes = screen.getAllByText(new RegExp(currentWord.split('').join('|')));

        expect(letterBoxes).toHaveLength(currentWord.length);
    });
    it('Should show word in each letter box when current word and attempts are passed', () => {
        const currentWord = 'tests';
        const attempts = [ 'test1', 'test2', 'test3' ];
        render(
            <WordAttempts
                attempts={ attempts.map((word) => ({ letterStatuses: [], word })) }
                currentWord={ currentWord }
                quantity={ 6 }
                wordLength={ 5 }
                tryAnimation={ null }
            />
        );

        const allWords = [ ...attempts, currentWord ].join('');
        const letterBoxes = screen.getAllByText(new RegExp(allWords.split('').join('|')));

        expect(letterBoxes).toHaveLength(allWords.length);
    });
});
