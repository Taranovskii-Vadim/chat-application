import { memo } from 'react';
import Box from '@mui/material/Box';
import grey from '@mui/material/colors/grey';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import Flexbox from 'src/components/Flexbox';

interface Props {
  title: string;
}

const Header = ({ title }: Props): JSX.Element => (
  <Flexbox
    sx={{
      height: '38px',
      padding: '8px 16px',
      borderLeft: `1px solid ${grey['300']}`,
      borderBottom: `1px solid ${grey['300']}`,
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Box>
      <IconButton size="small" sx={{ mr: 1 }}>
        <SearchOutlinedIcon />
      </IconButton>
      <IconButton size="small">
        <MoreVertOutlinedIcon />
      </IconButton>
    </Box>
  </Flexbox>
);

export default memo(Header);
