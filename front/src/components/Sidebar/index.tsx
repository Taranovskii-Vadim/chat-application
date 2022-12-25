import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Grid, Avatar, Typography, Box, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

import ChatsStore from '../../store/chats';
import { User } from '../../store/user/types';

import { stringAvatar } from './helpers';

const store = new ChatsStore();

interface Props {
  user: User;
}

const Sidebar = ({ user: { id } }: Props): JSX.Element => {
  const navigate = useNavigate();

  const { data, isLoading } = store;

  useEffect(() => {
    store.fetchData(id);
  }, [id]);

  return (
    <Grid item xs={2.5} sx={{ borderRight: `1px solid ${grey['300']}` }}>
      <Box sx={{ height: '38px', padding: '8px 16px', borderBottom: `1px solid ${grey['300']}` }}>
        <TextField size="small" label="uniq user login to chat" fullWidth />
      </Box>
      {!isLoading ? (
        data.map(({ id, members, unReadCount }) => (
          <Grid
            container
            key={id}
            onClick={() => navigate(`/${id}`)}
            sx={{ p: 2, cursor: 'pointer', maxHeight: '72px', alignItems: 'center' }}
          >
            <Grid item xs={3}>
              <Avatar {...stringAvatar(members[0])} />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6">{members[0]}</Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        // TODO add loading
        <div>loading...</div>
      )}
    </Grid>
  );
};

export default observer(Sidebar);
