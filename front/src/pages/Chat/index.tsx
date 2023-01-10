import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Box, TextField, Typography, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import ChatStore from '../../store/chat';
import { User } from '../../store/user/types';
import Message from './components/Message';
import Flexbox from '../../components/Flexbox';
import Loader from '../../components/ui/Loader';
import { Message as MessageType } from '../../store/chat/types';
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
    socket.on('receiveMessage', (data: Omit<MessageType, 'createdAt'>) => {
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

  // TODO add borders to the app
  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px' }}>
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
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1, backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
        {store.messages.map(({ id, senderId, text, isLoading, createdAt }) => {
          const isAuthor = senderId === currentUserId;

          return <Message key={id} isAuthor={isAuthor} text={text} createdAt={createdAt} />;
        })}
      </Box>
      <Box sx={{ display: 'flex', p: 1 }}>
        <IconButton size="small">
          <AttachFileIcon />
        </IconButton>
        {/* <TextField placeholder="Write a message..." inputRef={inputRef} fullWidth size="small" sx={{ mr: 1, ml: 1 }} /> */}
        <InputBase sx={{ mr: 1, ml: 1, flex: 1 }} placeholder="Write a message..." />
        <IconButton size="small" sx={{ mr: 1 }}>
          <SentimentSatisfiedAltIcon />
        </IconButton>
        {/* TODO disable if input is empty */}
        <IconButton size="small" color="primary" disabled={store.isFormLoading} onClick={handleAddMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default observer(Chat);
