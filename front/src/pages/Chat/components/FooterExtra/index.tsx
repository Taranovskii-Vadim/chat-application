import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, IconButton, SvgIconTypeMap } from '@mui/material';

import Flexbox from 'src/components/Flexbox';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Icon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

interface Props {
  Icon: Icon;
  first: string;
  second: string;
  onClick: () => void;
}

const FooterExtra = ({ first, second, Icon, onClick }: Props): JSX.Element => (
  <Flexbox sx={{ p: 1, borderLeft: `1px solid ${grey['300']}` }}>
    <Flexbox>
      <Icon color="primary" sx={{ mr: 1 }} />
      <Box>
        <Typography color="primary">{first}</Typography>
        <Typography>{second}</Typography>
      </Box>
    </Flexbox>
    <IconButton size="small" onClick={onClick}>
      <CloseIcon />
    </IconButton>
  </Flexbox>
);

export default FooterExtra;
