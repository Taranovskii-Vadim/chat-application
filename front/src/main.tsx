import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { theme } from './style';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
