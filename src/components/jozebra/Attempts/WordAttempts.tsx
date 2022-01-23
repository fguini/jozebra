import React from 'react';
import styled from 'styled-components';
import { WordRow } from './WordRow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface WordAttemptsProps {
    quantity: number;
    theWord: string;
    wordLength: number;
    words: Array<string>;
}

export function WordAttempts({ quantity, theWord, wordLength, words }: WordAttemptsProps) {
    return (<Container>
        {
            [ ...Array(quantity) ].map((_, i) =>
                <WordRow key={ i } length={ wordLength } theWord={ theWord } word={ words[i] }/>)
        }
    </Container>);
}
