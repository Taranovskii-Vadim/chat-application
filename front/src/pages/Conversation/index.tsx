import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';

const Conversation = (): JSX.Element => {
  const socket = useRef<Socket<any, any>>();
  const { id } = useParams<{ id: string }>();

  // const [sendMessage, setSendMessage] = useState(null);
  // const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
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

  return (
    <>
      <Box sx={{ p: '12px 16px' }}>{id}</Box>
      <Box sx={{ backgroundColor: 'blue', flex: 1, overflowY: 'scroll' }}>
        {data.map(({ id, senderId, text }) => {
          return (
            // TODO instead of 1 use real userId
            <Typography key={id} sx={{ textAlign: senderId === 1 ? 'right' : 'left' }}>
              {text}
            </Typography>
          );
        })}
      </Box>
      <Box sx={{ p: '12px 16px' }}>
        <TextField
          fullWidth
          size="small"
          onKeyUp={({ target, key }) => {
            if (key === 'Enter') {
              // handleAddMessage(target.value);
            }
          }}
        />
      </Box>
    </>
  );
};

export default Conversation;
