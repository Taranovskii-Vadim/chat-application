import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';

import { theme } from './style';

import App from './App';

const node = document.getElementById('root') as HTMLElement;
const root = createRoot(node);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
