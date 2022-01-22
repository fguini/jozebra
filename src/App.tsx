import React from 'react';
import { Trans } from 'react-i18next';
import { Container } from '@mui/material';
import { AppBar } from './components/layout/AppBar';

function App() {
    return (
        <>
            <AppBar />
            <main>
                <Container maxWidth="xl">
                    <Trans i18nKey="app.title"/>
                </Container>
            </main>
        </>
    );
}

export default App;
