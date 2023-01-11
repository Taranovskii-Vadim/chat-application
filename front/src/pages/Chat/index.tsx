import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Typography, IconButton, InputBase } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import { formatDate } from '../../utils';
import ChatStore from '../../store/chat';
import Message from './components/Message';
import { User } from '../../store/user/types';
import Flexbox from '../../components/Flexbox';
import Loader from '../../components/ui/Loader';
import { Message as MessageType } from '../../store/chat/types';

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

  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px', borderLeft: `1px solid ${grey['300']}` }}>
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
      <Box sx={{ display: 'flex', alignItems: 'end', p: 1, borderLeft: `1px solid ${grey['300']}` }}>
        <IconButton size="small">
          <AttachFileIcon />
        </IconButton>
        <InputBase
          multiline
          inputRef={inputRef}
          sx={{ mr: 1, ml: 1, flex: 1, maxHeight: '130px', overflow: 'auto', paddingBottom: '6px' }}
          placeholder="Write a message..."
        />
        <IconButton size="small" sx={{ mr: 1 }}>
          <EmojiEmotionsOutlinedIcon />
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
