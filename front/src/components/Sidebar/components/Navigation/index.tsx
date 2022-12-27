import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Typography } from '@mui/material';

import ChatsStore from '../../../../store/chats';

import { stringAvatar } from './helpers';

interface Props {
  store: ChatsStore;
}

const Navigation = ({ store: { data } }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState(0);

  useEffect(() => {
    const chatId = parseInt(location.pathname.split('/')[1], 10);

    if (chatId !== activeChatId) {
      setActiveChatId(chatId);
    }
  });

  return (
    <>
      {data.map(({ id, title, unReadCount }) => {
        const isEqual = activeChatId === id;

        return (
          <Grid
            container
            key={id}
            onClick={() => navigate(`/${id}`)}
            sx={{
              p: 2,
              cursor: 'pointer',
              maxHeight: '72px',
              alignItems: 'center',
              backgroundColor: isEqual ? '#0088cc' : 'transparent',
            }}
          >
            <Grid item xs={3}>
              <Avatar {...stringAvatar(title)} />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" sx={{ color: isEqual ? 'white' : 'inherit' }}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default Navigation;
