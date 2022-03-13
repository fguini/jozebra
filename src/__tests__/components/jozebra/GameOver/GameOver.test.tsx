import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameOver } from '../../../../components/jozebra/GameOver/GameOver';

describe('<GameOver />', () => {
    it('Should not render modal when game is not finished', () => {
        render(<GameOver finished={ false }/>);

        const title = screen.queryByText('app.gameOver.title.win');

        expect(title).toBeNull();
    });
    it('Should show win message when user wins the game', () => {
        render(<GameOver finished={ 'Win' }/>);

        expect(screen.getByText('app.gameOver.title.win')).toBeInTheDocument();
    });
    it('Should show defeat message when user lose the game', () => {
        render(<GameOver finished={ 'Defeat' }/>);

        expect(screen.getByText('app.gameOver.title.defeat')).toBeInTheDocument();
    });
    it('Should close modal when close button is clicked', async () => {
        render(<GameOver finished={ 'Win' }/>);

        const closeButton = screen.getByRole('button', { name: 'app.actions.close' });
        expect(closeButton).toBeInTheDocument();

        userEvent.click(closeButton);

        await waitFor(() => {
            expect(closeButton).not.toBeInTheDocument();
        });
    });
});