import { ThemeOptions } from '@mui/material';

export const components: ThemeOptions['components'] = {
  MuiChip: {
    styleOverrides: {
      sizeSmall: {
        minWidth: '16px',
        height: '16px',
        fontSize: '11px',
      },
    },
  },
};
