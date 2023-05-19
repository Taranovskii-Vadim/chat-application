import { createTheme } from '@mui/material';
import { green, lightBlue } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: { light: lightBlue['400'], main: lightBlue['500'], dark: lightBlue['600'] },
    secondary: { main: green['500'] },
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
