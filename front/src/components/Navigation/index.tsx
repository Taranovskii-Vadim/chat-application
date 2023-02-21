import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Typography, Chip, styled, Badge } from '@mui/material';

import user from 'src/store/user';
import store from 'src/store/chats';
import { formatDate } from 'src/utils';
import { palette } from 'src/style/palette';
import { LastMessage, OnlineUser } from 'src/store/chats/types';

import Flexbox from '../Flexbox';
import Loader from '../ui/Loader';

import { STYLES } from './constants';
import { stringAvatar } from './helpers';

// TODO remove any later
interface Props {
  socket: any;
}

const DOTS_STYLE = {
  width: '80%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const Navigation = ({ socket }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    store.fetchData();

    socket.on('getUsers', (users: OnlineUser[]) => {
      const otherOnlineUsers = users.filter((item) => item.id !== user.data?.id);
      store.setIsOnline(otherOnlineUsers);
    });

    socket.on('receiveLastMessage', ({ chatId, ...others }: { chatId: number } & Omit<LastMessage, 'createdAt'>) => {
      store.setLastMessage(chatId, { ...others, createdAt: formatDate(new Date()) });
    });
  }, []);

  useEffect(() => {
    const chatId = parseInt(location.pathname.split('/')[1], 10);

    if (chatId !== activeId) {
      setActiveId(chatId);
    }
  });

  if (store.isLoading) {
    return <Loader height="90vh" />;
  }

  return (
    <>
      {store.data.map(({ id, title, unReadCount, isOnline, lastMessage }) => {
        const isEqual = activeId === id;

        const Title = (
          <Typography variant="h6" sx={{ ...DOTS_STYLE, color: isEqual ? palette.common.white : 'inherit' }}>
            {title}
          </Typography>
        );

        return (
          <Grid
            container
            key={id}
            onClick={() => navigate(`/${id}`)}
            sx={{
              ...STYLES,
              backgroundColor: isEqual ? palette.primary.main : 'transparent',
            }}
          >
            <Grid item xs={3}>
              {isOnline ? (
                <StyledBadge
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar {...stringAvatar(title)} />
                </StyledBadge>
              ) : (
                <Avatar {...stringAvatar(title)} />
              )}
            </Grid>
            <Grid item xs={9}>
              {lastMessage ? (
                <>
                  <Flexbox sx={{ mb: '3px' }}>
                    {Title}
                    <Typography variant="subtitle1" sx={{ color: isEqual ? palette.common.white : 'inherit' }}>
                      {lastMessage.createdAt}
                    </Typography>
                  </Flexbox>
                  <Flexbox>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        ...DOTS_STYLE,
                        color: isEqual ? palette.common.white : 'inherit',
                      }}
                    >
                      {`${lastMessage.senderId === user.data?.id ? 'You:' : ''} ${lastMessage.text}`}
                    </Typography>
                    {unReadCount ? <Chip color="primary" size="small" label={unReadCount} /> : null}
                  </Flexbox>
                </>
              ) : (
                Title
              )}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default observer(Navigation);
