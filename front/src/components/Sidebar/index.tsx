import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Box, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';

import ChatsStore from '../../store/chats';
import { User } from '../../store/user/types';

import Navigation from './components/Navigation';

const store = new ChatsStore();

interface Props {
  user: User;
}

const Sidebar = ({ user: { id } }: Props): JSX.Element => {
  useEffect(() => {
    store.fetchData(id);
  }, [id]);

  return (
    <Grid item xs={2.5} sx={{ borderRight: `1px solid ${grey['300']}` }}>
      <Box sx={{ height: '38px', padding: '8px 16px', borderBottom: `1px solid ${grey['300']}` }}>
        <TextField size="small" label="uniq user login to chat" fullWidth />
      </Box>
      {!store.isLoading ? (
        <Navigation store={store} />
      ) : (
        // TODO add loader
        <div>loading...</div>
      )}
    </Grid>
  );
};

export default observer(Sidebar);
