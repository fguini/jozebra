import React from 'react';
import { TheGame } from '../components/jozebra/TheGame';

const theWord = 'calor';

export function Home() {
    return (<TheGame theWord={ theWord } words={ ['orina', 'suela' ] }/>);
}
