import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Backspace } from '@mui/icons-material';
import { BACKSPACE_KEY, ENTER_KEY, getKeyboard } from '../GameUtils';
import { KeyBox } from './KeyBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`;

const KeyRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

interface KeyboardProps {
    handleClick: (letter: string) => void;
    handleErase: () => void;
    handleSubmit: () => void;
}

export function Keyboard({ handleClick, handleErase, handleSubmit }: KeyboardProps) {
    const { i18n } = useTranslation();
    const keyboardKeys = useMemo(() => getKeyboard(i18n.language), [ i18n.language ]);

    useEffect(() => {
        function runOnKeyEvent(key: string, callback: (element: HTMLElement) => void) {
            if (
                (key.length === 1 && /[a-zñ]/i.test(key))
                || [ BACKSPACE_KEY, ENTER_KEY ].includes(key)
            ) {
                const element = document.getElementById(`key-${key.toLowerCase()}`);
                if(element) {
                    callback(element);
                }
            }
        }

        const handleKeyUp = ({ key }: KeyboardEvent) => runOnKeyEvent(key, (element) => {
            element.classList.remove('active');
            element.click();
        });

        const handleKeyDown = ({ key }: KeyboardEvent) => runOnKeyEvent(key, (element) => {
            element.classList.add('active');
        });

        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, []);

    return (
        <Container>
            {
                keyboardKeys.map((row, i) => {
                    const lastRow = keyboardKeys.length - 1 === i;

                    return (
                        <React.Fragment key={ row.join('') }>
                            <KeyRow>
                                {
                                    lastRow && <KeyBox letter={ ENTER_KEY } handleClick={ handleSubmit }/>
                                }
                                {
                                    row.map((key) => (
                                        <KeyBox key={ key } letter={ key } handleClick={ handleClick }/>
                                    ))
                                }
                                {
                                    lastRow && <KeyBox letter={ BACKSPACE_KEY } handleClick={ handleErase }>
                                        <Backspace/>
                                    </KeyBox>
                                }
                            </KeyRow>
                        </React.Fragment>
                    );
                })
            }
        </Container>
    );
}
