import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TheGame } from '../../../components/jozebra/TheGame';

describe('<TheGame/>', () => {
    async function waitForAnimationsDelay() {
        await act(() =>
            new Promise<void>((resolve) => setTimeout(resolve, 1000))
        );
    }

    it('Should try a word when typed and pressed enter', async () => {
        const theWordTest = 'tests';
        const toTry = 'cruza';
        const extraLetter = 't';

        render(<TheGame theWord={ theWordTest }/>);

        toTry.split('').forEach((letter, index) => {
            index % 2
                ? userEvent.click(screen.getByRole('button', { name: letter }))
                : userEvent.keyboard(letter);
        });

        const extraButton = screen.getByRole('button', { name: extraLetter });

        userEvent.click(extraButton);

        const notLetterBoxList = screen.queryAllByText(extraLetter);
        expect(notLetterBoxList).toHaveLength(1);

        userEvent.click(screen.getByRole('button', { name: /enter/i }));

        const letterBoxes = toTry.split('').map((letter) => {
            const [ letterBox ] = screen.getAllByText(letter);
            return letterBox;
        });

        await waitFor(() => {
            letterBoxes.forEach((letterBox) => expect(letterBox).toBeInTheDocument());
        });

        userEvent.click(extraButton);

        const [ extraLetterBox ] = screen.queryAllByText(extraLetter);
        expect(extraLetterBox).toBeInTheDocument();
    });
    it('Should lose game when no more tries left', async () => {
        const theWordTest = 'tests';
        const toTry = 'cruza';
        const quantity = 2;

        render(<TheGame theWord={ theWordTest } quantity={ quantity }/>);

        userEvent.keyboard(toTry);
        userEvent.click(screen.getByRole('button', { name: /enter/i }));

        await waitForAnimationsDelay();

        userEvent.keyboard(toTry);
        userEvent.click(screen.getByRole('button', { name: /enter/i }));

        await waitFor(() => {
            expect(screen.getByText('app.gameOver.title.defeat')).toBeInTheDocument();
        });
    });
    it('Should win game when tries correct word', async () => {
        const theWordTest = 'alfil';
        const toTry = 'cruza';

        render(<TheGame theWord={ theWordTest }/>);

        userEvent.keyboard(toTry);
        userEvent.click(screen.getByRole('button', { name: /enter/i }));

        await waitForAnimationsDelay();

        userEvent.keyboard(theWordTest);
        userEvent.click(screen.getByRole('button', { name: /enter/i }));

        await waitFor(() => {
            expect(screen.getByText('app.gameOver.title.win')).toBeInTheDocument();
        });
    });
    it('Should no count as an attempt when word is not in dictionary', async () => {
        const theWordTest = 'alfil';
        const toTry = 'abcde';

        render(<TheGame theWord={ theWordTest }/>);

        userEvent.keyboard(toTry);
        userEvent.click(screen.getByRole('button', { name: /enter/i }));

        await waitForAnimationsDelay();

        userEvent.keyboard('[Backspace]');
        userEvent.keyboard('[Backspace]');
        userEvent.keyboard('[Backspace]');
        userEvent.keyboard('[Backspace]');
        const backspaceButton = screen.getAllByRole('button').find((el) => el.id === 'key-backspace');
        if(backspaceButton) {
            userEvent.click(backspaceButton);
        }

        await waitForAnimationsDelay();

        await waitFor(() => {
            toTry.split('').forEach((letter) => screen.getByText(letter));
        });
    });
    it('Should different number of letter boxes when different quantity and wordLength passed', () => {
        const spyLetterBox = jest.spyOn(require('../../../components/jozebra/Attempts/LetterBox'), 'LetterBox');
        const testQuantity = 38;
        const testWordLength = 29;
        render(<TheGame theWord="tests" quantity={ testQuantity } wordLength={ testWordLength } />);

        expect(spyLetterBox).toBeCalledTimes(testQuantity * testWordLength * 2); // * 2 => two renders
        spyLetterBox.mockRestore();
    });
});