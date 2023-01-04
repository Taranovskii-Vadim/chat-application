import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Grid, Typography, Chip } from '@mui/material';

import ChatsStore from '../../store/chats';
import { palette } from '../../style/palette';
import UserStore from '../../store/user';

import Flexbox from '../Flexbox';

import { STYLES } from './constants';
import Loader from '../ui/Loader';
import { stringAvatar } from './helpers';

interface Props {
  user: UserStore;
  socket: any;
  store: ChatsStore;
}

const Navigation = ({ store, socket, user }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    store.fetchData();

    socket.on('getUsers', (activeUsers: { id: number }[]) => {
      // console.log(users);
      // const isOnline = !!users.find((item) => item.id === store.data.members[0]);
      // store.setIsUserOnline(isOnline);
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
      {store.data.map(({ id, title, unReadCount, lastMessage }) => {
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
              <Avatar {...stringAvatar(title)} />
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
                      {`${user.data && lastMessage.senderId === user.data.id ? 'You:' : ''} ${lastMessage.text}`}
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
