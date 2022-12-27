import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { grey } from '@mui/material/colors';

import { User } from '../../store/user/types';
import ChatStore from '../../store/chat';

import Flexbox from '../../components/Flexbox';
import Loader from '../../components/ui/Loader';

const store = new ChatStore();

interface Props {
  user: User;
}

// TODO we must create chut store first and then messages
const Conversation = ({ user }: Props): JSX.Element => {
  // TODO fix any later
  const inputRef = useRef<any>();
  const socket = useRef<Socket<any, any>>();
  const { id } = useParams<{ id: string }>();

  // const [sendMessage, setSendMessage] = useState(null);
  // const [receivedMessage, setReceivedMessage] = useState(null);

  console.log(store.data);

  useEffect(() => {
    if (id) {
      store.fetchData(+id);
    }
  }, [id]);

  useEffect(() => {
    socket.current = io('http://localhost:8080');
    socket.current.emit('addNewUser', user.id);

    socket.current.on('getUsers', (users: any) => {
      // TODO here we must set online users
      console.log(users);
    });

    socket.current.on('receiveMessage', (data: any) => {
      console.log(data);
      // setReceivedMessage(data);
    });
  }, []);

  // useEffect(() => {
  //   if (sendMessage !== null) {
  //     socket.current.emit('sendMessage', sendMessage);
  //   }
  // }, [sendMessage]);

  if (store.isLoading || !store.data) {
    return <Loader height="100vh" />;
  }

  const handleAddMessage = (): void => {
    if (socket.current) {
      const text = inputRef.current.value;
      store.addMessage(user.id, text);
      // TODO here we must provide receiverId and text
      socket.current.emit('sendMessage', text);
    }
  };

  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px', borderBottom: `1px solid ${grey['300']}` }}>
        <Box>
          <Typography variant="h6">{store.data.title}</Typography>
          {/* <Typography color="primary" variant="subtitle1">
            online
          </Typography> */}
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

export default observer(Conversation);
