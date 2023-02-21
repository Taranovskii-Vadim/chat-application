import { createTheme } from '@mui/material';

import { palette } from './palette';
import { components } from './components';
import { typography } from './typography';

export const theme = createTheme({
  palette,
  typography,
  components,
});
