import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { grey } from '@mui/material/colors';

import ChatStore from '../../store/chat';
import { User } from '../../store/user/types';
import Loader from '../../components/ui/Loader';
import Flexbox from '../../components/Flexbox';
import { Message } from '../../store/chat/types';

const store = new ChatStore();

interface Props {
  socket: any;
  currentUserId: User['id'];
}

const Chat = ({ socket, currentUserId }: Props): JSX.Element => {
  // TODO fix any later
  const inputRef = useRef<any>();
  const { data } = store;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      store.fetchData(+id);
    }
  }, [id]);

  useEffect(() => {
    socket.on('receiveMessage', (data: Message) => {
      store.setMessage(data);
    });
  }, []);

  if (store.isLoading || !data) {
    return <Loader height="100vh" />;
  }

  const handleAddMessage = async (): Promise<void> => {
    if (id) {
      const text = inputRef.current.value;
      // TODO can receive chatId from store
      const chatId = +id;
      const messageId = await store.addMessage(currentUserId, text);

      const config = {
        text,
        chatId,
        id: messageId,
        senderId: currentUserId,
        receiverId: data.members[0],
      };

      socket.emit('sendMessage', config);
    }
  };

  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px', borderBottom: `1px solid ${grey['300']}` }}>
        <Box>
          <Typography variant="h6">{data.title}</Typography>
          {/* {store.isUserOnline ? (
            <Typography color="primary" variant="subtitle2">
              online
            </Typography>
          ) : null} */}
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
          <Typography key={id} sx={{ textAlign: senderId === currentUserId ? 'right' : 'left' }}>
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
