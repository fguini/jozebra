import React, { useMemo } from 'react';
import styled from 'styled-components';
import { LetterStatus } from '../GameUtils';
import { LetterBox } from './LetterBox';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

interface WordProps {
    length: number;
    theWord: string;
    word?: string;
}

function getLetterStatuses(theWord: string, word: string): Array<LetterStatus> {
    const letterStatuses = Array(theWord.length);
    const inPlaceLetters = [];
    const theWordLetters = theWord.split('');

    for(let i = 0; i < word.length; i++) {
        if(theWord[i] === word[i]) {
            letterStatuses[i] = LetterStatus.InPlace;
            inPlaceLetters.push(word[i]);
        }
    }

    for(let i = 0; i < word.length; i++) {
        if(theWordLetters.includes(word[i]) && !inPlaceLetters.includes(word[i])) {
            letterStatuses[i] = LetterStatus.InWord;
        }
    }

    return letterStatuses;
}

export function WordRow({ length, theWord, word = '' }: WordProps) {
    let letterStatuses = useMemo(
        () => getLetterStatuses(theWord, word),
        [ theWord, word ],
    );

    return (<Container>
        {
            [ ...Array(length) ].map((_, i) =>
                <LetterBox key={ i } letter={ word[i] } status={ letterStatuses[i] }/>,
            )
        }
    </Container>);
}