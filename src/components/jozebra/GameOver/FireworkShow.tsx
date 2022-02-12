import React, { useEffect, useRef, useState } from 'react';
import { Firework } from './Firework';

interface FireworkSetup {
    position: number;
    height: number;
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
    const [ setup, setSetup ] = useState<FireworkSetup>({
        position: randomIntFromInterval(20, 80),
        height: randomIntFromInterval(20, 80)
    });

    useInterval(() => {
        setSetup({
            position: randomIntFromInterval(20, 80),
            height: randomIntFromInterval(20, 80)
        });
    }, 1500);

    return <Firework topHeight={setup.height} basePosition={setup.position}/>;
}
