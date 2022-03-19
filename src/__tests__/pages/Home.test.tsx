import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Home } from '../../pages/Home';
import { Cache } from '../../utils/cache-utils';
import { addAttempt, getAttempts } from '../../services/attempt-service';
import { getTodayWord } from '../../services/word-service';

describe('<Home/>', () => {
    afterEach(() => {
        Cache.clear();
    });

    it('Should show default TheGame quantity and word length when enter to Home', async () => {
        const spyLetterBox = jest.spyOn(require('../../components/jozebra/Attempts/LetterBox'), 'LetterBox');
        render(<Home/>);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(spyLetterBox).toBeCalledTimes(5 * 6 * 2);
        });
        spyLetterBox.mockRestore();
    });

    it('Should show error message when failed to retrieve attempts or today word', async () => {
        const spyGetAttempts = jest.spyOn(require('../../services/attempt-service'), 'getAttempts');
        const spyGetTodayWord = jest.spyOn(require('../../services/word-service'), 'getTodayWord');
        spyGetAttempts.mockRejectedValueOnce('Error getting attempts');
        spyGetTodayWord.mockRejectedValueOnce('Error getting today word');

        render(<Home/>);

        await waitFor(() => {
            expect(screen.getByText(/An error occurred:/i)).toBeInTheDocument();
        });
        expect(getTodayWord).toBeCalledTimes(1);
        expect(getAttempts).toBeCalledTimes(1);
        spyGetAttempts.mockRestore();
        spyGetTodayWord.mockRestore();
    });
    it('Should load previous attempts when user had played before today', async () => {
        const previouslyAttemptedWord = 'tests';
        await addAttempt(previouslyAttemptedWord);

        render(<Home/>);

        await waitFor(() => {
            previouslyAttemptedWord.split('').forEach((letter) => {
                const [ attemptLetter ] = screen.getAllByText(letter);
                expect(attemptLetter).toBeInTheDocument();
            });
        });
    });
    it('Should show game winner message when user already played and won today', async () => {
        const previouslyAttemptedWord = await getTodayWord();
        await addAttempt(previouslyAttemptedWord);

        render(<Home/>);

        await waitFor(() => {
            expect(screen.getByText('app.gameOver.title.win')).toBeInTheDocument();
        });
    });
    it('Should show game loser message when user already played and lose today', async () => {
        await addAttempt('test1');
        await addAttempt('test2');
        await addAttempt('test3');
        await addAttempt('test4');
        await addAttempt('test5');
        await addAttempt('test6');

        render(<Home/>);

        await waitFor(() => {
            expect(screen.getByText('app.gameOver.title.defeat')).toBeInTheDocument();
        });
    });
});
