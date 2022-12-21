import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Grid, Avatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import ChatsStore from '../../store/chats';

import { stringAvatar } from './helpers';

const store = new ChatsStore();

const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();

  const { data, isLoading } = store;

  useEffect(() => {
    store.fetchData('1');
  }, []);

  return (
    <Grid item xs={2.5} sx={{ borderRight: `1px solid ${grey['300']}` }}>
      {!isLoading ? (
        data.map(({ id }) => (
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
        ))
      ) : (
        <div>loading...</div>
      )}
    </Grid>
  );
};

export default observer(Sidebar);
