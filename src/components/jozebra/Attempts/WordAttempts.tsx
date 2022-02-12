import React from 'react';
import styled from 'styled-components';
import { WordRow } from './WordRow';
import {
    Attempt,
    ATTEMPT_ANIMATION_SUCCESSFUL,
    ATTEMPT_ANIMATION_WRONG,
    TryAnimation,
} from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface WordAttemptsProps {
    currentWord: string;
    quantity: number;
    tryAnimation: TryAnimation;
    wordLength: number;
    attempts: Array<Attempt>;
}

const CurrentAnimations: Array<TryAnimation> = [ ATTEMPT_ANIMATION_WRONG ];
const LastWordAnimation: Array<TryAnimation> = [ ATTEMPT_ANIMATION_SUCCESSFUL ];

export function WordAttempts({
    attempts,
    currentWord,
    quantity,
    tryAnimation,
    wordLength
}: WordAttemptsProps) {
    const currentAttempt = { word: currentWord, letterStatuses: [] };
    const currentWordIndex = attempts.length;
    const lastWordIndex = currentWordIndex - 1;

    const wordAnimation = {
        [currentWordIndex]: CurrentAnimations.includes(tryAnimation) && tryAnimation,
        [lastWordIndex]: LastWordAnimation.includes(tryAnimation) && tryAnimation,
    }

    return (<Container>
        {
            [ ...Array(quantity) ].map((_, i) =>
                <WordRow
                    key={ i }
                    attempt={ i === currentWordIndex ? currentAttempt : attempts[i] }
                    length={ wordLength }
                    tryAnimation={ wordAnimation[i] || null }
                />)
        }
    </Container>);
}
