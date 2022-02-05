import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Backspace } from '@mui/icons-material';
import { Attempt, BACKSPACE_KEY, ENTER_KEY, getKeyboard, LetterStatus, STATUS_ORDER } from '../utils';
import { KeyBox } from './KeyBox';
import { useKeyboardListener } from './useKeyboardListener';

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

interface KeyStatus {
    [key: string]: LetterStatus;
}

interface KeyboardProps {
    attempts: Array<Attempt>;
    handleClick: (key: string) => void;
}

function getKeyStatuses(attempts: Array<Attempt>) {
    return attempts.reduce<any>((keysStatuses, attempt) => {
        attempt.word.split('').forEach((key, i) => {
           const currentKeyStatus = keysStatuses[key];
           const newKeyStatus = attempt.letterStatuses[i];

           keysStatuses[key] = STATUS_ORDER.indexOf(currentKeyStatus) >= STATUS_ORDER.indexOf(newKeyStatus)
               ? currentKeyStatus
               : newKeyStatus;
        });

        return keysStatuses;
    }, {});
}

export function Keyboard({ attempts, handleClick }: KeyboardProps) {
    const { i18n } = useTranslation();
    const keyboardKeys = useMemo(() => getKeyboard(i18n.language), [ i18n.language ]);
    const [ keyStatus, setKeyStatus ] = useState<KeyStatus>({});

    useKeyboardListener();

    useEffect(() => {
        setKeyStatus(getKeyStatuses(attempts));
    }, [ attempts ])

    return (
        <Container>
            {
                keyboardKeys.map((row, i) => {
                    const lastRow = keyboardKeys.length - 1 === i;

                    return (
                        <React.Fragment key={ row.join('') }>
                            <KeyRow>
                                {
                                    lastRow && <KeyBox letter={ ENTER_KEY } handleClick={ handleClick }/>
                                }
                                {
                                    row.map((key) => (
                                        <KeyBox
                                            key={ key }
                                            letter={ key }
                                            status={  keyStatus[key] || LetterStatus.NotAttempted }
                                            handleClick={ handleClick }
                                        />
                                    ))
                                }
                                {
                                    lastRow && (
                                        <KeyBox letter={ BACKSPACE_KEY } handleClick={ handleClick }>
                                            <Backspace/>
                                        </KeyBox>
                                    )
                                }
                            </KeyRow>
                        </React.Fragment>
                    );
                })
            }
        </Container>
    );
}
