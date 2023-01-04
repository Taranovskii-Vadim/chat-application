import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Grid, Typography, Chip, styled, Badge } from '@mui/material';

import ChatsStore from '../../store/chats';
import { palette } from '../../style/palette';

import Flexbox from '../Flexbox';

import { STYLES } from './constants';
import Loader from '../ui/Loader';
import { stringAvatar } from './helpers';
import { User } from '../../store/user/types';
import { OnlineUser } from '../../store/chats/types';

// TODO remove any later
interface Props {
  socket: any;
  store: ChatsStore;
  currentUserId: User['id'];
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const Navigation = ({ store, socket, currentUserId }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    store.fetchData();

    socket.on('getUsers', (users: OnlineUser[]) => {
      const otherOnlineUsers = users.filter((item) => item.id !== currentUserId);
      store.setIsOnline(otherOnlineUsers);
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
          <Typography variant="h6" sx={{ color: isEqual ? palette.common.white : 'inherit' }}>
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
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
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
                        width: '80%',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: isEqual ? palette.common.white : 'inherit',
                      }}
                    >
                      {`${lastMessage.senderId === currentUserId ? 'You:' : ''} ${lastMessage.text}`}
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
