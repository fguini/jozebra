import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslation } from 'react-i18next';
import { Keyboard } from '../../../../components/jozebra/Keyboard/Keyboard';

describe('<Keyboard />', () => {
    afterEach(() => {
        const { i18n } = useTranslation();
        i18n.changeLanguage('es');
    });
    it('Should render all keys including ñ when language is es', () => {
        render(<Keyboard attempts={ [] } handleClick={ () => null }/>);

        const keys = screen.getAllByRole('button');
        const keysLetters = keys.map((key) => key.textContent);

        expect(keys).toHaveLength(29);
        expect(keysLetters).toContain('ñ');
    });
    it('Should render all keys without ñ when language is en', () => {
        const { i18n } = useTranslation();
        i18n.changeLanguage('en');
        render(<Keyboard attempts={ [] } handleClick={ () => null }/>);

        const keys = screen.getAllByRole('button');
        const keysLetters = keys.map((key) => key.textContent);

        expect(keys).toHaveLength(28);
        expect(keysLetters).not.toContain('ñ');
    });
    it('Should call click callback when each button is clicked', () => {
        const handleClickMock = jest.fn();

        render(<Keyboard attempts={ [] } handleClick={ handleClickMock }/>);

        const keys = screen.getAllByRole('button');
        const keysLetters = keys.map((key) => key.textContent || key.id.replace('key-', ''));
        keys.forEach((keyButton) => {
            userEvent.click(keyButton);
        });

        expect(handleClickMock).toBeCalledTimes(keys.length);
        handleClickMock.mock.calls.forEach((call, index) => {
            expect(call[0].toLowerCase()).toBe(keysLetters[index].toLowerCase());
        });
    });
    it('Should call click callback when keyboard keys are pressed', () => {
        const handleClickMock = jest.fn();
        const keys = 'qwertyuiopasdffghjklñzxcvbnm';

        render(<Keyboard attempts={ [] } handleClick={ handleClickMock }/>);

        userEvent.keyboard(keys);

        expect(handleClickMock).toBeCalledTimes(keys.length);
        handleClickMock.mock.calls.forEach((call, index) => {
            expect(call[0]).toBe(keys[index]);
        });

        handleClickMock.mockReset();
        userEvent.keyboard('[Enter][Backspace]');

        expect(handleClickMock).toBeCalledTimes(2);
        expect(handleClickMock.mock.calls[0][0]).toBe('Enter');
        expect(handleClickMock.mock.calls[1][0]).toBe('Backspace');
    });
    it('Should have active class when keydown', () => {
        render(<Keyboard attempts={ [] } handleClick={ () => null }/>);
        const tButton = screen.getByRole('button', { name: 't' });

        fireEvent.keyDown(window, { key: 't' });
        expect(tButton).toHaveClass('active');

        fireEvent.keyUp(window, { key: 't' });
        expect(tButton).not.toHaveClass('active');
    });
});
