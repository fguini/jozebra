import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
    it('Should render home screen when root path', async () => {
        const spyLetterBox = jest.spyOn(require('../components/jozebra/Attempts/LetterBox'), 'LetterBox');
        render(<App />);

        screen.getByRole('heading', { name: /app.title/ });
        screen.getByText('Loading...');

        await waitFor(() => {
            expect(spyLetterBox).toBeCalledTimes(5 * 6 * 2);
        });
        spyLetterBox.mockRestore();
    });
});
