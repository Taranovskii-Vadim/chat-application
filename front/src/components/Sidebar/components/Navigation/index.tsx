import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Grid, Typography, Chip } from '@mui/material';

import ChatsStore from '../../../../store/chats';
import { palette } from '../../../../style/palette';

import Flexbox from '../../../Flexbox';

import { STYLES } from './constants';
import { stringAvatar } from './helpers';

interface Props {
  store: ChatsStore;
}

const Navigation = ({ store: { data } }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    const chatId = parseInt(location.pathname.split('/')[1], 10);

    if (chatId !== activeId) {
      setActiveId(chatId);
    }
  });

  return (
    <>
      {data.map(({ id, title, unReadCount, lastMessage }) => {
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
                  <Flexbox>
                    {Title}
                    {lastMessage ? (
                      <Typography variant="subtitle1" sx={{ color: isEqual ? palette.common.white : 'inherit' }}>
                        {lastMessage.createdAt}
                      </Typography>
                    ) : null}
                  </Flexbox>
                  <Flexbox>
                    {lastMessage ? (
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
                        {lastMessage.text}
                      </Typography>
                    ) : null}
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

export default Navigation;
