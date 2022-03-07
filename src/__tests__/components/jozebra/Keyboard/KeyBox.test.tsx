import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeyBox } from '../../../../components/jozebra/Keyboard/KeyBox';

describe('<KeyBox />', () => {
    it('Should render box with letter', () => {
        const className = 'test-class';
        const letter = 'a';
        render(<KeyBox className={ className } handleClick={ () => null } letter={ letter }/>);

        const keyButton = screen.getByRole('button', { name: letter });

        expect(keyButton).toBeInTheDocument();
        expect(keyButton).toHaveClass(className);
    });
    it('Should call callback when letter box is clicked', () => {
        const handleClickMock = jest.fn();
        const letter = 'a';
        render(<KeyBox handleClick={ handleClickMock } letter={ letter }/>);

        const keyButton = screen.getByRole('button', { name: letter });

        userEvent.click(keyButton);

        expect(handleClickMock).toBeCalledTimes(1);
    });
});