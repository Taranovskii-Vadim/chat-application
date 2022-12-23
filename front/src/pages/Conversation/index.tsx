import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { grey } from '@mui/material/colors';

import MessagesStore from '../../store/messages';

import Flexbox from '../../components/Flexbox';

const store = new MessagesStore();

const Conversation = (): JSX.Element => {
  // TODO fix any later
  const inputRef = useRef<any>();
  const socket = useRef<Socket<any, any>>();
  const { id } = useParams<{ id: string }>();

  // const [sendMessage, setSendMessage] = useState(null);
  // const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    store.fetchData(id);

    socket.current = io('http://localhost:8080');

    socket.current.emit('newUserAdd', 1);

    socket.current.on('getUsers', (users: any) => {
      console.log(users);
    });

    // socket.current.on('receiveMessage', (data: any) => {
    //   setReceivedMessage(data);
    // });
  }, []);

  // useEffect(() => {
  //   if (sendMessage !== null) {
  //     socket.current.emit('sendMessage', sendMessage);
  //   }
  // }, [sendMessage]);

  // const handleAddMessage = async (text: string): Promise<void> => {
  //   const payload = { chatId: 1, senderId: 1, text };
  //   const id = await api(postMessage, payload);

  //   setMessages((prev) => [...prev, { id, senderId: 1, text }]);
  // };

  if (store.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px', borderBottom: `1px solid ${grey['300']}` }}>
        <Box>
          <Typography variant="h6">Eva Summer</Typography>
          <Typography color="primary" variant="subtitle1">
            online
          </Typography>
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
        {store.data.map(({ id, senderId, text }) => {
          return (
            // TODO instead of 1 use real userId
            <Typography key={id} sx={{ textAlign: senderId === 1 ? 'right' : 'left' }}>
              {text}
            </Typography>
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', p: '12px 16px' }}>
        <TextField inputRef={inputRef} fullWidth size="small" />
        <Button disabled={store.isFormLoading} onClick={() => store.addMessage(inputRef.current.value)}>
          Send
        </Button>
      </Box>
    </>
  );
};

export default observer(Conversation);
