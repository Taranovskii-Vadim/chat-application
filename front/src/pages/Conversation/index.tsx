import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Box, TextField, Typography } from '@mui/material';

import { api } from '../../api';
import getMessages from '../../api/getMessages';
import postMessage from '../../api/postMessage';

const Conversation = (): JSX.Element => {
  const socket = useRef();
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api(getMessages, undefined, 1);

      setMessages(response);
    };

    fetchData();

    socket.current = io('http://localhost:8080');

    socket.current.emit('newUserAdd', 1);

    socket.current.on('getUsers', (users) => {
      console.log(users);
    });
  }, []);

  useEffect(() => {
    socket.current.on('receiveMessage', (data) => {
      setReceivedMessage(data);
    });
  }, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('sendMessage', sendMessage);
    }
  }, [sendMessage]);

  const handleAddMessage = async (text: string): Promise<void> => {
    const payload = { chatId: 1, senderId: 1, text };
    const id = await api(postMessage, payload);

    setMessages((prev) => [...prev, { id, senderId: 1, text }]);
  };

  return (
    <>
      <Box sx={{ p: '12px 16px' }}>{id}</Box>
      <Box sx={{ backgroundColor: 'blue', flex: 1, overflowY: 'scroll' }}>
        {messages.map(({ id, senderId, text }) => {
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
              handleAddMessage(target.value);
            }
          }}
        />
      </Box>
    </>
  );
};

export default Conversation;
