import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Chip } from '@mui/material';

import user from 'src/store/user';
import store from 'src/store/chats';
import { formatDate } from 'src/utils';
import { LastMessage, OnlineUser } from 'src/store/chats/types';

import Flexbox from '../Flexbox';
import Loader from '../ui/Loader';

import UserAvatar from './components/UserAvatar';

import { STYLES } from './constants';

const Navigation = (): JSX.Element => {
  // console.log()
  const { socket, data } = user;

  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(parseInt(location.pathname.split('/')[1], 10));

  useEffect(() => {
    store.fetchData();

    // TODO we get online users only if one new user connect to socket.
    // Think about how to get online users on first render
    socket.on('getUsers', (users: OnlineUser[]) => {
      store.setIsOnline(users.filter(({ id }) => id !== data?.id));
    });

    // socket.on('receiveLastMessage', ({ chatId, ...others }: { chatId: number } & Omit<LastMessage, 'createdAt'>) => {
    //   store.setLastMessage(chatId, { ...others, createdAt: formatDate(new Date()) });
    // });
  }, []);

  if (store.isLoading) {
    // TODO maybe better use backdrop
    return <Loader height="90vh" />;
  }

  const handleNavigate = (id: number): void => {
    setActiveId(id);
    navigate(`/${id}`);
  };

  return (
    <>
      {store.data.map(({ id, title, unReadCount, isOnline, lastMessage }) => {
        const isEqual = activeId === id;

        const colorSx = { color: isEqual ? 'common.white' : 'inherit' };

        const dotsSx = {
          ...colorSx,
          width: '80%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        };

        const Title = (
          <Typography variant="h6" sx={dotsSx}>
            {title}
          </Typography>
        );

        return (
          <Grid
            key={id}
            container
            onClick={() => handleNavigate(id)}
            sx={{
              ...STYLES,
              backgroundColor: isEqual ? 'primary.main' : 'transparent',
            }}
          >
            <UserAvatar isOnline={isOnline} title={title} />
            <Grid item xs={9}>
              {lastMessage ? (
                <>
                  <Flexbox sx={{ mb: '3px' }}>
                    {Title}
                    <Typography variant="subtitle1" sx={colorSx}>
                      {lastMessage.createdAt}
                    </Typography>
                  </Flexbox>
                  <Flexbox>
                    <Typography variant="subtitle1" sx={dotsSx}>
                      {`${lastMessage.senderId === data?.id ? 'You:' : ''} ${lastMessage.text}`}
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
