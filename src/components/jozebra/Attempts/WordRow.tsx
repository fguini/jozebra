import React from 'react';
import styled from 'styled-components';
import { Attempt, TryAnimation } from '../utils';
import { LetterBox } from './LetterBox';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

interface WordProps {
    attempt: Attempt;
    length: number;
    tryAnimation: TryAnimation;
}

export function WordRow({ attempt, length, tryAnimation }: WordProps) {
    return (<Container>
        {
            [ ...Array(length) ].map((_, i) =>
                <LetterBox
                    key={ i }
                    letter={ attempt?.word[i] }
                    status={ attempt?.letterStatuses[i] }
                    tryAnimation={ tryAnimation }
                />
            )
        }
    </Container>);
}