import { Box, Typography } from '@mui/material';

import bg from 'src/assets/bg.jpg';

const General = (): JSX.Element => (
  <Box sx={{ flex: 1, backgroundImage: `url(${bg})`, backgroundSize: 'cover', overflowY: 'auto' }}>
    <Typography variant="h3" sx={{ color: 'common.white' }}>
      Choose chat to start messaging
    </Typography>
  </Box>
);

export default General;
