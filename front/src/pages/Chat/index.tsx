import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';

import ChatStore from '../../store/chat';
import { User } from '../../store/user/types';
import Flexbox from '../../components/Flexbox';
import Loader from '../../components/ui/Loader';
import { Message } from '../../store/chat/types';
import { formatDate } from '../../utils';

import background from '../../assets/bg.jpg';

const store = new ChatStore();

// TODO fix any later

interface Props {
  socket: any;
  currentUserId: User['id'];
}

const Chat = ({ socket, currentUserId }: Props): JSX.Element => {
  const { data } = store;

  const { id } = useParams<{ id: string }>();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (id) {
      store.fetchData(+id);
    }
  }, [id]);

  useEffect(() => {
    socket.on('receiveMessage', (data: Omit<Message, 'createdAt'>) => {
      store.setMessage({ ...data, createdAt: formatDate(new Date()) });
    });
  }, []);

  if (store.isLoading || !data) {
    return <Loader height="100vh" />;
  }

  const handleAddMessage = async (): Promise<void> => {
    if (inputRef.current) {
      const text = inputRef.current.value;

      const response = await store.addMessage(currentUserId, text);

      if (response) {
        socket.emit('sendMessage', {
          text,
          ...response,
          senderId: currentUserId,
          receiverId: data.members[0],
        });
      }
    }
  };

  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px', borderBottom: `1px solid ${grey['300']}` }}>
        <Typography variant="h6">{data.title}</Typography>
        <Box>
          <IconButton size="small" sx={{ mr: 1 }}>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton size="small">
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>
      </Flexbox>
      <Box sx={{ flex: 1, overflowY: 'scroll', p: 1, backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
        {store.messages.map(({ id, senderId, text, isLoading, createdAt }) => {
          const isAuthor = senderId === currentUserId;

          return (
            <Flexbox key={id} sx={{ justifyContent: isAuthor ? 'flex-end' : 'flex-start', mb: 1 }}>
              <Box sx={{ backgroundColor: isAuthor ? '#b1e8a7' : 'white', maxWidth: '55%', borderRadius: 1, p: 1 }}>
                <Typography>{text}</Typography>
                <Typography sx={{ textAlign: 'right', fontSize: '12px' }}>{createdAt}</Typography>
              </Box>
            </Flexbox>
          );
        })}
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
