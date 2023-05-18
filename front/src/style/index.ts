import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: { light: 'rgb(56 189 248)', main: 'rgb(14 165 233)', dark: 'rgb(2 132 199)', contrastText: '#ffffff' },
  },
  components: {
    MuiList: { styleOverrides: { root: { padding: 0 } } },
  },
  typography: {
    h6: { fontSize: '16px', fontWeight: 500 },
    body1: { fontSize: '14px', fontWeight: 400 },
    subtitle1: { fontSize: '12px', lineHeight: 1.5 },
  },
});
