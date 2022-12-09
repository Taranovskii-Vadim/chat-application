import { useRecoilValue } from 'recoil';
import { Grid, Avatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { chatsState } from '../../store/chats';

import { stringAvatar } from './helpers';

const Sidebar = (): JSX.Element => {
  const chats = useRecoilValue(chatsState);

  return (
    <Grid item xs={2.5} sx={{ borderRight: `1px solid ${grey['300']}` }}>
      {chats.map((item) => (
        <Grid container sx={{ p: 2, cursor: 'pointer', maxHeight: '72px', alignItems: 'center' }}>
          <Grid item xs={3}>
            <Avatar {...stringAvatar('Тарановский Вадим')} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h3">Тарановский Вадим</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Sidebar;
