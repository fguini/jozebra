import React from 'react';
import { Trans } from 'react-i18next';
import { AppBar as MaterialAppBar, Container, Typography } from '@mui/material';

export function AppBar() {
    return (<MaterialAppBar position="relative">
        <Container maxWidth="xl">
            <Typography variant="h3" align="center">
                <Trans i18nKey="app.title"/>
            </Typography>
        </Container>
    </MaterialAppBar>);
}