import { createTheme } from '@mui/material';

import { palette } from './palette';

// TODO create color pallete
// TODO choose font for project

export const theme = createTheme({
  palette,
  typography: {
    body1: { fontSize: '14px', fontWeight: 400 },
    h6: { fontSize: '14px', fontWeight: 600 },
    subtitle1: { fontSize: '12px', fontWeight: 400 },
    subtitle2: { fontSize: '11px', fontWeight: 400 },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          minWidth: '16px',
          height: '16px',
          fontSize: '11px',
        },
      },
    },
  },
});
