import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe.skip('<App />', () => {
    it('Should render home screen when root path', () => {
        render(<App />);
    });
});
