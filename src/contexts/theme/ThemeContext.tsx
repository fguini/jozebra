import React, { ReactNode } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <MaterialThemeProvider theme={ theme }>
            { children }
        </MaterialThemeProvider>
    );
}