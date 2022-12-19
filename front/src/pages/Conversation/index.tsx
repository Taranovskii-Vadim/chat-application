import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Box, TextField, Typography } from '@mui/material';

import { currentChatId, currentMessages } from '../../store/messages';

const Conversation = (): JSX.Element => {
  const socket = useRef();
  const { id } = useParams<{ id: string }>();
  const setChatId = useSetRecoilState(currentChatId);
  const data = useRecoilValue(currentMessages);

  useEffect(() => {
    if (id) {
      setChatId(+id);
    }
  }, [id]);

  useEffect(() => {
    socket.current = io('http://localhost:8080');

    socket.current.emit('newUserAdd', 1);

    socket.current.on('getUsers', (users) => {
      console.log(users);
    });
  }, []);

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
              // setData(target.value);
            }
          }}
        />
      </Box>
    </>
  );
};

export default Conversation;
