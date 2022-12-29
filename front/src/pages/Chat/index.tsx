import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { grey } from '@mui/material/colors';

import { User } from 'src/store/user/types';
import ChatStore from 'src/store/chat';

import Flexbox from 'src/components/Flexbox';
import Loader from 'src/components/ui/Loader';

const store = new ChatStore();

interface Props {
  user: User;
}

const Chat = ({ user }: Props): JSX.Element => {
  // TODO fix any later
  const inputRef = useRef<any>();
  const socket = useRef<Socket<any, any>>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      store.fetchData(+id);
    }
  }, [id]);

  useEffect(() => {
    socket.current = io('http://localhost:8080');
    socket.current.emit('addNewUser', user.id);

    socket.current.on('getUsers', (users: { id: number }[]) => {
      const isOnline = !!users.find((item) => item.id === store.data.members[0]);

      store.setIsUserOnline(isOnline);
    });

    socket.current.on('receiveMessage', (data: any) => {
      store.setLastMessage(data.senderId, data.text);
    });
  }, []);

  if (store.isLoading || !store.data) {
    return <Loader height="100vh" />;
  }

  const handleAddMessage = (): void => {
    if (socket.current && store.data) {
      const text = inputRef.current.value;
      store.addMessage(user.id, text);
      // TODO maybe we should await addMessage get messageId from api and provide it to socket
      socket.current.emit('sendMessage', { senderId: user.id, receiverId: store.data.members[0], text });
    }
  };

  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px', borderBottom: `1px solid ${grey['300']}` }}>
        <Box>
          <Typography variant="h6">{store.data.title}</Typography>
          {store.isUserOnline ? (
            <Typography color="primary" variant="subtitle1">
              online
            </Typography>
          ) : null}
        </Box>
        <Box>
          <IconButton size="small" sx={{ mr: 1 }}>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton size="small">
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>
      </Flexbox>
      <Box sx={{ flex: 1, overflowY: 'scroll' }}>
        {store.messages.map(({ id, senderId, text }) => (
          <Typography key={id} sx={{ textAlign: senderId === user.id ? 'right' : 'left' }}>
            {text}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', p: '12px 16px' }}>
        <TextField inputRef={inputRef} fullWidth size="small" />
        <Button disabled={store.isFormLoading} onClick={handleAddMessage}>
          Send
        </Button>
      </Box>
    </>
  );
};

export default observer(Chat);
