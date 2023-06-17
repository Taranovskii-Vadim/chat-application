import { Box, Typography } from '@mui/material';

const Welcome = (): JSX.Element => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h4" sx={{ mb: 2 }}>
      Welcome to the chat app
    </Typography>
    <Typography variant="h6">Choose chat to start messaging</Typography>
  </Box>
);

export default Welcome;
