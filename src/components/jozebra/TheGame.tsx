import React, { useState } from 'react';
import { WordAttempts } from './Attempts/WordAttempts';
import { Keyboard } from './Keboard/Keyboard';

interface TheGameProps {
    quantity?: number;
    theWord: string;
    wordLength?: number;
    initialWords?: Array<string>;
}

export function TheGame({ quantity = 6, theWord, wordLength = 5, initialWords = [] }: TheGameProps) {
    const [ words, setWords ] = useState<Array<string>>([ ...initialWords, ...(Array(quantity - initialWords?.length).map(() => '')) ]);
    const [ currentWordIndex, setCurrentWordIndex ] = useState<number>(initialWords?.length ?? 0);
    const currentWord = words[currentWordIndex] || '';

    function handleClick(letter: string) {
        if(currentWord.length < wordLength) {
            const newWord = `${currentWord}${letter}`;
            console.log(newWord);
            setWords(words.map((word, i) => i === currentWordIndex ? newWord : word));
        }
    }

    function handleSubmit() {
        if(currentWord.length === wordLength) {
            // TODO check if existent word
            setCurrentWordIndex(currentWordIndex + 1);
        }
    }

    function handleErase() {
        if(currentWord.length) {
            const newWord = currentWord.slice(0, -1);
            setWords(words.map((word, i) => i === currentWordIndex ? newWord : word));
        }
    }

    return (
        <>
            <WordAttempts
                quantity={ quantity }
                theWord={ theWord }
                wordLength={ wordLength }
                words={ words }
            />
            <Keyboard
                handleClick={ handleClick }
                handleErase={ handleErase }
                handleSubmit={ handleSubmit }
            />
        </>
    );
}