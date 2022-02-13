import React, { useEffect, useRef, useState } from 'react';
import { Firework } from './Firework';

interface FireworkSetup {
    height: number;
    key: string;
    position: number;
}

type Callback = () => void;

function useInterval(callback: Callback, delay: number) {
    const savedCallback = useRef<Callback>(() => null);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [ callback ]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [ delay ]);
}

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function FireworkShow() {
    const [ fireworksSetups, setFireworksSetups ] = useState<Array<FireworkSetup>>([]);

    useInterval(() => {
        const newFireworksSetups = [
            ...fireworksSetups,
            {
                key: randomIntFromInterval(20, 1000).toString(),
                height: randomIntFromInterval(20, 80),
                position: randomIntFromInterval(20, 80),
            }
        ];

        if(newFireworksSetups.length > 4) {
            newFireworksSetups.shift();
        }

        setFireworksSetups(newFireworksSetups);
    }, 1500);

    return (
        <>
            {
                fireworksSetups.map((setup) =>
                    <Firework key={ setup.key } topHeight={ setup.height } basePosition={ setup.position }/>)
            }
        </>
    );
}
