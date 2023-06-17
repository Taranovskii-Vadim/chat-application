import { CircularProgress, Box } from '@mui/material';

const Loader = (): JSX.Element => (
  <Box sx={{ textAlign: 'center' }}>
    <CircularProgress />
  </Box>
);

export default Loader;
