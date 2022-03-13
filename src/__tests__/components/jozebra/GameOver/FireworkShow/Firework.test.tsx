import React from 'react';
import { render } from '@testing-library/react';
import { Firework } from '../../../../../components/jozebra/GameOver/FireworkShow/Firework';

describe('<Firework />', () => {
    it('Should render when always', () => {
        render(<Firework topHeight={ 50 } basePosition={ 50 }/>);
    });
});