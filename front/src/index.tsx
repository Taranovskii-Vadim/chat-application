import React from 'react';
import { ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';

import { theme } from './style';

import App from './App';

const node = document.getElementById('root') as HTMLElement;
const root = createRoot(node);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
