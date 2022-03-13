import React from 'react';
import { render } from '@testing-library/react';
import { FireworkShow } from '../../../../../components/jozebra/GameOver/FireworkShow/FireworkShow';

describe('<FireworkShow/>', () => {
    it('Should render when always', async () => {
        render(<FireworkShow/>);
    });
});