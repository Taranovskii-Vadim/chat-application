import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

interface Props {
  children: ReactNode;
  borderPosition: 'top' | 'bottom';
}

const BlockWrapper = ({ children, borderPosition }: Props): JSX.Element => {
  const position = borderPosition[0].toUpperCase() + borderPosition.slice(1);

  return (
    <Box
      sx={{
        px: 2,
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        [`border${position}`]: `1px solid ${grey['300']}`,
      }}
    >
      {children}
    </Box>
  );
};

export default BlockWrapper;
