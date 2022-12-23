import { Box, BoxProps } from '@mui/material';

const Flexbox: React.FC<BoxProps> = ({ children, sx, ...props }): JSX.Element => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...sx }} {...props}>
    {children}
  </Box>
);

export default Flexbox;
