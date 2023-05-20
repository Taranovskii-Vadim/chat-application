import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

interface Props {
  children: ReactNode;
  border?: 'top' | 'bottom';
}

const BlockWrapper = ({ children, border }: Props): JSX.Element => {
  let sx = { px: 2, height: '50px', display: 'flex', alignItems: 'center' };

  if (border) {
    const position = border && border[0].toUpperCase() + border.slice(1);
    sx = { ...sx, [`border${position}`]: `1px solid ${grey['300']}` };
  }

  return <Box sx={sx}>{children}</Box>;
};

export default BlockWrapper;
