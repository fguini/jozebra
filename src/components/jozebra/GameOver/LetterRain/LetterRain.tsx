import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { randomWithInterval } from '../../../../utils/number-utils';
import { LetterFalling } from './LetterFalling';

const rainyWords = [
    'gameOver',
    'tryAgain',
    'continueImproving',
    'youAreGreat',
    'justAMisstep',
];

interface LetterSetup {
    key: string;
    letter: string;
    position: number;
    time: number;
}

export function LetterRain() {
    const { t } = useTranslation();

    const [ currentWordIndex, setCurrentWordIndex ] = useState<number>(0);
    const word = t(`app.gameOver.rain.${rainyWords[currentWordIndex]}`);
    let maxTime = 0;
    const letters = word.split('').map((letter, index) => {
        const time = randomWithInterval(4500, 5500);
        if(time > maxTime) {
            maxTime = time;
        }

        return {
            key: `${currentWordIndex}-${index}`,
            letter,
            position: (index * 80 / word.length) + 12,
            time,
        };
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            let nextWordIndex: number;
            do {
                nextWordIndex = randomWithInterval(0, rainyWords.length - 1);
            } while(nextWordIndex === currentWordIndex);

            setCurrentWordIndex(nextWordIndex);
        }, maxTime);

        return () => clearTimeout(timeoutId);
    }, [ currentWordIndex, maxTime ]);

    return (
        <>
            {
                letters.map(({ key, letter, position, time }: LetterSetup) =>
                    <LetterFalling key={ key } time={ time } basePosition={ position }>
                        { letter }
                    </LetterFalling>,
                )
            }
        </>
    );
}
