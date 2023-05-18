import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, Typography, Avatar, Box } from '@mui/material';

import user from 'src/store/user';
import { Chat } from 'src/store/user/types';

interface Props {
  data: Chat[];
}

// TODO maybe create routes folder
const BASE = '/conversation/';

const Chats = ({ data }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(parseInt(location.pathname.split(BASE)[1], 10));

  const handleMoveToConversation = (id: number): void => {
    navigate(`${BASE}${id}`);
    setCurrent(id);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map(({ id, title, avatar, unReadCount, lastMessage }) => {
        const isEqual = current === id;
        const count = unReadCount >= 1000 ? '999+' : unReadCount;

        return (
          <ListItem
            key={id}
            onClick={() => handleMoveToConversation(id)}
            sx={{
              cursor: 'pointer',
              color: isEqual ? 'common.white' : '',
              backgroundColor: isEqual ? 'primary.main' : '',
              '&:hover': {
                color: 'common.white',
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Avatar src={avatar} />
            <Box sx={{ flex: 1, ml: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', md: 1 }}>
                <Typography variant="h6">{title}</Typography>
                {lastMessage ? <Typography variant="subtitle1">{lastMessage.createdAt}</Typography> : null}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {lastMessage ? (
                  <Typography
                    sx={{ overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '210px', textOverflow: 'ellipsis' }}
                  >
                    {user.data?.id === lastMessage.sender.id ? `You: ${lastMessage.text}` : lastMessage.text}
                  </Typography>
                ) : null}
                {count ? (
                  <Box
                    sx={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'primary.main',
                      textAlign: 'center',
                      color: 'common.white',
                      borderRadius: '50%',
                    }}
                  >
                    <Typography variant="subtitle1">{count}</Typography>
                  </Box>
                ) : null}
              </Box>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Chats;
