import React, { useEffect, useState } from 'react';
import { WordAttempts } from './Attempts/WordAttempts';
import { Keyboard } from './Keboard/Keyboard';
import { Attempt, BACKSPACE_KEY, ENTER_KEY, LetterStatus } from './GameUtils';

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

export function TheGame({ quantity = 6, theWord, wordLength = 5, words = [] }: TheGameProps) {
    const [ attempts, setAttempts ] = useState<Array<Attempt>>(
        () => words.map((word) => ({ letterStatuses: getLetterStatuses(theWord, word), word }))
    );
    const [ currentWord, setCurrentWord ] = useState<string>('');

    useEffect(() => {
        const handleKeyUp = ({ key }: KeyboardEvent) => {
            if (key.length === 1 && /[a-z]/i.test(key)) {
                handleClick(key);
            } else if(key === BACKSPACE_KEY) {
                handleErase();
            } else if(key === ENTER_KEY) {
                handleSubmit();
            }
        }

        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [ currentWord ]);

    function handleClick(letter: string) {
        if(currentWord.length < wordLength) {
            setCurrentWord(`${currentWord}${letter}`);
        }
    }

    function handleSubmit() {
        if(currentWord.length === wordLength) {
            // TODO check if existent word
            setAttempts([
                ...attempts,
                {
                    letterStatuses: getLetterStatuses(theWord, currentWord),
                    word: currentWord
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
        <>
            <WordAttempts
                attempts={ attempts }
                currentWord={ currentWord }
                quantity={ quantity }
                wordLength={ wordLength }
            />
            <Keyboard
                handleClick={ handleClick }
                handleErase={ handleErase }
                handleSubmit={ handleSubmit }
            />
        </>
    );
}