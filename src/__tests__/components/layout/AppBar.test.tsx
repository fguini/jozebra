import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppBar } from '../../../components/layout/AppBar';

describe('<AppBar />', () => {
    it('Should render with title when always', () => {
        const titleText = 'app.title';
        render(<AppBar />);

        const title = screen.getByRole('heading', { name: titleText });

        expect(title).toHaveTextContent(titleText);
    });
});