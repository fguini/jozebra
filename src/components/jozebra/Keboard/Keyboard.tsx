import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getKeyboard } from '../GameUtils';
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

    return (
        <Container>
            {
                keyboardKeys.map((row, i) => {
                    const lastRow = keyboardKeys.length - 1 === i;

                    return (
                        <React.Fragment key={ row.join('') }>
                            <KeyRow>
                                {
                                    lastRow && <KeyBox letter="Enter" handleClick={ handleSubmit } />
                                }
                                {
                                    row.map((key) => (
                                        <KeyBox key={ key } letter={ key } handleClick={ handleClick } />
                                    ))
                                }
                                {
                                    lastRow && <KeyBox letter="<x]" handleClick={ handleErase } />
                                }
                            </KeyRow>
                        </React.Fragment>
                    );
                })
            }
        </Container>
    );
}
