import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Box, TextField } from '@mui/material';

import ChatsStore from 'src/store/chats';
import { User } from 'src/store/user/types';

import Loader from '../ui/Loader';
import Navigation from './components/Navigation';

import { STYLES } from './constants';

const store = new ChatsStore();

interface Props {
  user: User;
}

const Sidebar = ({ user: { id } }: Props): JSX.Element => {
  useEffect(() => {
    store.fetchData(id);
  }, [id]);

  return (
    <Grid item xs={2.5}>
      <Box sx={STYLES}>
        <TextField size="small" label="Добавить чат" placeholder="Логин пользователя" fullWidth />
      </Box>
      {store.isLoading ? <Loader height="90vh" /> : <Navigation store={store} />}
    </Grid>
  );
};

export default observer(Sidebar);
