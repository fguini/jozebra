import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { Home } from './pages/Home';
import { AppBar } from './components/layout/AppBar';

function App() {
    return (<>
        <AppBar/>
        <main>
            <Container className="main-container" maxWidth="xl">
                <BrowserRouter>
                    <Routes>
                        <Route index element={ <Home/> }/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </main>
    </>);
}

export default App;
