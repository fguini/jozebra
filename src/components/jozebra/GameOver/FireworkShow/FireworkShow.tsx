import React, { useState } from 'react';
import { useInterval } from '../../../hooks/use-interval';
import { randomWithInterval } from '../../../../utils/number-utils';
import { Firework } from './Firework';

interface FireworkSetup {
    height: number;
    key: string;
    position: number;
}

export function FireworkShow() {
    const [ fireworksSetups, setFireworksSetups ] = useState<Array<FireworkSetup>>([]);

    useInterval(() => {
        const newFireworksSetups = [
            ...fireworksSetups,
            {
                key: randomWithInterval(20, 1000).toString(),
                height: randomWithInterval(20, 80),
                position: randomWithInterval(20, 80),
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
