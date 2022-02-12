import React from 'react';
import ReactDOM from 'react-dom';
import './locale/i18n';
import { ThemeProvider } from './contexts/theme/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles.css';

ReactDOM.render(<React.StrictMode>
    <ThemeProvider>
        <CssBaseline/>
        <App/>
    </ThemeProvider>
</React.StrictMode>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
