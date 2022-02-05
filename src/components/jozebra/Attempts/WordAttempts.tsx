import React from 'react';
import styled from 'styled-components';
import { WordRow } from './WordRow';
import { Attempt } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface WordAttemptsProps {
    currentWord: string;
    quantity: number;
    wordLength: number;
    attempts: Array<Attempt>;
}

export function WordAttempts({ attempts, currentWord, quantity, wordLength }: WordAttemptsProps) {
    const currentAttempt = { word: currentWord, letterStatuses: [] };
    const currentWordIndex = attempts.length;
    return (<Container>
        {
            [ ...Array(quantity) ].map((_, i) =>
                <WordRow
                    key={ i }
                    attempt={ i === currentWordIndex ? currentAttempt : attempts[i] }
                    length={ wordLength }
                />)
        }
    </Container>);
}
