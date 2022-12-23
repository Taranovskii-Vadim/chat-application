import { createTheme } from '@mui/material';

// TODO create color pallete
// TODO choose font for project

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0088cc',
    },
  },
  typography: {
    body1: { fontSize: '14px', fontWeight: 400 },
    h6: { fontSize: '14px', fontWeight: 600 },
    subtitle1: { fontSize: '11px', fontWeight: 400 },
  },
});
