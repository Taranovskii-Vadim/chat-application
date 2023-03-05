import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, GridProps } from '@mui/material';

import user from 'src/store/user';
import store from 'src/store/chats';
import { Message } from 'src/store/chat/types';
import { OnlineUser } from 'src/store/chats/types';

import Loader from '../ui/Loader';

import LinkBody from './components/LinkBody';
import UserAvatar from './components/UserAvatar';

const Navigation = (): JSX.Element => {
  const { socket, data } = user;

  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(parseInt(location.pathname.split('/')[1], 10));

  useEffect(() => {
    store.fetchData();

    socket.on('getUsers', (users: OnlineUser[]) => {
      store.setIsOnline(users.filter(({ id }) => id !== data?.id));
    });

    socket.on('setLastMessage', (value: Message) => {
      store.setLastMessage(value);
    });
  }, []);

  if (store.isLoading) {
    // TODO maybe better use backdrop
    return <Loader height="90vh" />;
  }

  const handleNavigate = (id: number): void => {
    if (id !== activeId) {
      setActiveId(id);
      store.resetUnReadCount(id);
      navigate(`/${id}`);
    }
  };

  return (
    <>
      {store.data.map(({ id, title, isOnline, unReadCount, lastMessage }) => {
        const isEqual = activeId === id;

        const sx: GridProps['sx'] = {
          p: 1,
          cursor: 'pointer',
          alignItems: 'center',
          backgroundColor: isEqual ? 'primary.main' : 'transparent',
        };

        return (
          <Grid key={id} container sx={sx} onClick={() => handleNavigate(id)}>
            <UserAvatar isOnline={isOnline} title={title} />
            <LinkBody
              title={title}
              isEqual={isEqual}
              currentUserId={data?.id}
              unReadCount={unReadCount}
              lastMessage={lastMessage}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default observer(Navigation);
