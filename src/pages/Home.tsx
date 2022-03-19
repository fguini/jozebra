import React, { useEffect, useState } from 'react';
import { TheGame } from '../components/jozebra/TheGame';
import { getTodayWord } from '../services/word-service';
import { getAttempts } from '../services/attempt-service';

type Status = 'pending' | 'resolved' | 'rejected';

interface HomeState {
    attempts?: Array<string>;
    error?: any;
    status: Status;
    theWord?: string;
}

export function Home() {
    const [ state, setState ] = useState<HomeState>({
        attempts: [],
        status: 'pending',
        theWord: '',
    });

    useEffect(() => {
        Promise.all([ getTodayWord(), getAttempts(), ])
           .then(([ theWord, attempts ]) => {
               setState({
                   attempts,
                   status: 'resolved',
                   theWord,
               });
           })
           .catch((error) => setState({ error, status: 'rejected' }));
    }, []);

    const { attempts, error, status, theWord } = state;
    if(status === 'pending') {
        return <div>Loading...</div>;
    } else if(status === 'resolved') {
        return <TheGame theWord={ theWord ?? '' } words={ attempts }/>;
    } else {
        return <div>An error occurred: { error?.message ?? error }</div>;
    }
}
