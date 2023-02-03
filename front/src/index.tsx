import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';

import { theme } from './style';

import App from './App';

// TODO add signUp opportinuty
// TODO add client and server validation to login form

// TODO add empty image and text to start chat with someone maybe add some recommendations
// TODO add background to chat area

// TODO add last message time
// TODO add last message

// Second way optional
// TODO add search opportinuty
// TODO add drawer bar
// TODO add avatar change option

const node = document.getElementById('root') as HTMLElement;
const root = createRoot(node);

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
