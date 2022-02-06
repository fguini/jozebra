import React, { useEffect, useState } from 'react';
import { TheGame } from '../components/jozebra/TheGame';
import { getTodayWord } from '../services/word-service';

export function Home() {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ theWord, setTheWord ] = useState<string>('');

    useEffect(() => {
        getTodayWord()
            .then(setTheWord)
            .catch(console.error)
            .then(() => setLoading(false));
    }, []);

    return (
        loading && !theWord
            ? <div>Loading</div>
            : (<TheGame theWord={ theWord } words={ ['orina', 'suela' ] }/>)
    );
}
