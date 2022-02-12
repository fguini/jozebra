import React, { useEffect, useMemo, useState } from 'react';
import { WordAttempts } from './Attempts/WordAttempts';
import { Keyboard } from './Keboard/Keyboard';
import {
    Attempt,
    BACKSPACE_KEY,
    ENTER_KEY,
    Finished,
    FINISHED_DEFEAT,
    FINISHED_WIN,
    LetterStatus,
    TRY_ANIMATION_ATTEMPT,
    TRY_ANIMATION_DEFEAT,
    TRY_ANIMATION_WIN,
    TRY_ANIMATION_WRONG,
    TryAnimation,
} from './utils';
import { GameOver } from './GameOver/GameOver';
import './GameStyle.css';
import { getWords } from '../../services/word-service';
import { addAttempt } from '../../services/attempt-service';

interface TheGameProps {
    quantity?: number;
    theWord: string;
    wordLength?: number;
    words?: Array<string>;
}

function getLetterStatuses(theWord: string, word: string): Array<LetterStatus> {
    const letterStatuses = [ ...Array(theWord.length) ];
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

    return letterStatuses.map((status) => status || LetterStatus.NotThere);
}

function hasFinished(attempts: Array<Attempt>, quantity: number) {
    let finished: Finished = false;
    const lastAttempt = attempts[attempts.length - 1];
    if(!lastAttempt) {
        return finished;
    } else if(lastAttempt.letterStatuses.every((status) => status === LetterStatus.InPlace)) {
        finished = FINISHED_WIN;
    } else if(attempts.length === quantity) {
        finished = FINISHED_DEFEAT;
    }
    return finished;
}

export function TheGame({ quantity = 6, theWord, wordLength = 5, words = [] }: TheGameProps) {
    const [ attempts, setAttempts ] = useState<Array<Attempt>>(
        () => words.map((word) => ({ letterStatuses: getLetterStatuses(theWord, word), word }))
    );
    const [ currentWord, setCurrentWord ] = useState<string>('');
    const [ tryAnimation, setTryAnimation ] = useState<TryAnimation>(null);
    const [ finished, setFinished ] = useState<Finished>(() => hasFinished(attempts, quantity));
    const dictionary = useMemo(() => getWords(), []);

    useEffect(() => {
        const finished = hasFinished(attempts, quantity);

        if(finished === FINISHED_WIN) {
            setTryAnimation(TRY_ANIMATION_WIN);
        } else if(finished === FINISHED_DEFEAT) {
            setTryAnimation(TRY_ANIMATION_DEFEAT);
        } else {
            setTryAnimation(TRY_ANIMATION_ATTEMPT);
        }

        setFinished(finished);
    }, [ attempts, quantity ]);

    function handleClick(key: string) {
        if(finished) {
            return;
        }

        switch(key) {
            case ENTER_KEY:
                handleSubmit();
                break;
            case BACKSPACE_KEY:
                handleErase();
                break;
            default:
                handleWrite(key);
                break;
        }
    }

    function handleWrite(letter: string) {
        if(currentWord.length < wordLength) {
            setCurrentWord(`${currentWord}${letter}`);
        }
    }

    async function handleSubmit() {
        if(currentWord.length === wordLength) {
            if(!dictionary.includes(currentWord)) {
                return setTryAnimation(TRY_ANIMATION_WRONG);
            }
            setAttempts([
                ...attempts,
                {
                    letterStatuses: getLetterStatuses(theWord, currentWord),
                    word: await addAttempt(currentWord)
                }
            ]);
            setCurrentWord('');
        }
    }

    function handleErase() {
        if(currentWord.length) {
            setCurrentWord(currentWord.slice(0, -1));
        }
    }

    return (
        <div className="the-game">
            <WordAttempts
                attempts={ attempts }
                currentWord={ currentWord }
                quantity={ quantity }
                tryAnimation={ tryAnimation }
                wordLength={ wordLength }
            />
            <Keyboard
                attempts={ attempts }
                handleClick={ handleClick }
            />
            <GameOver finished={ finished }/>
        </div>
    );
}