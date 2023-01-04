import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { BoxProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';
import grey from '@mui/material/colors/grey';

import UserStore from '../store/user';
import Loader from '../components/ui/Loader';
import ChatsStore from '../store/chats';
import Navigation from '../components/Navigation';
import Chat from './Chat';

const user = new UserStore();
const chats = new ChatsStore();

// const STYLES: BoxProps['sx'] = {
//   height: '38px',
//   pt: 1,
//   pr: 2,
//   pb: 1,
//   pl: 2,
//   borderBottom: `1px solid ${grey['300']}`,
// };
// TODO check component perfomance
const Pages = (): JSX.Element => {
  const [socket, setSocket] = useState<Socket<any, any>>();

  useEffect(() => {
    user.fetchData();
  }, []);

  useEffect(() => {
    if (user.data) {
      const connection = io('http://localhost:8080');
      connection.emit('addNewUser', user.data.id);

      setSocket(connection);
    }
  }, [user.data]);

  if (user.isLoading || !user.data || !socket) {
    return <Loader height="100vh" />;
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={2.5}>
        {/* <Box sx={STYLES}>
          <TextField size="small" label="Добавить чат" placeholder="Логин пользователя" fullWidth />
        </Box> */}
        <Navigation socket={socket} currentUserId={user.data.id} store={chats} />
      </Grid>
      <Grid
        item
        xs={9.5}
        sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%', borderLeft: `1px solid ${grey['300']}` }}
      >
        {/* TODO think about recoil better use mobx and then rewrite it to redux */}
        {/* TODO add lazy loading maybe */}
        <Routes>
          <Route path="/:id" element={<Chat socket={socket} currentUserId={user.data.id} />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default observer(Pages);
