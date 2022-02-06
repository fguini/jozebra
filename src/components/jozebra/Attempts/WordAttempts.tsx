import React from 'react';
import styled from 'styled-components';
import { WordRow } from './WordRow';
import {
    Attempt,
    TRY_ANIMATION_ATTEMPT,
    TRY_ANIMATION_DEFEAT,
    TRY_ANIMATION_WIN,
    TRY_ANIMATION_WRONG,
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

const CurrentAnimations: Array<TryAnimation> = [ TRY_ANIMATION_WRONG ];
const LastWordAnimation: Array<TryAnimation> = [ TRY_ANIMATION_ATTEMPT, TRY_ANIMATION_DEFEAT, TRY_ANIMATION_WIN ];

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
        [currentWordIndex]: CurrentAnimations.includes(tryAnimation) ? tryAnimation : null,
        [lastWordIndex]: LastWordAnimation.includes(tryAnimation) ? tryAnimation : null
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
