import { useRecoilValue } from 'recoil';

import { useNavigate } from 'react-router-dom';
import { Grid, Avatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { chatsSelector } from '../../store/chats';

import { stringAvatar } from './helpers';

const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const data = useRecoilValue(chatsSelector(1));

  return (
    <Grid item xs={2.5} sx={{ borderRight: `1px solid ${grey['300']}` }}>
      {data.map(({ id }) => (
        <Grid
          container
          key={id}
          onClick={() => navigate(`/${id}`)}
          sx={{ p: 2, cursor: 'pointer', maxHeight: '72px', alignItems: 'center' }}
        >
          <Grid item xs={3}>
            <Avatar {...stringAvatar('Тарановский Вадим')} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h3">{id}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Sidebar;
