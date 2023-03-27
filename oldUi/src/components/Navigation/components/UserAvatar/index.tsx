import { memo } from 'react';
import { Avatar, Grid, styled, Badge } from '@mui/material';

import { stringAvatar } from './helpers';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

interface Props {
  title: string;
  isOnline: boolean;
}

const UserAvatar = ({ title, isOnline }: Props): JSX.Element => {
  const Image = <Avatar {...stringAvatar(title)} />;

  return (
    <Grid item xs={3}>
      {!isOnline ? (
        Image
      ) : (
        <StyledBadge variant="dot" overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          {Image}
        </StyledBadge>
      )}
    </Grid>
  );
};

export default memo(UserAvatar);
