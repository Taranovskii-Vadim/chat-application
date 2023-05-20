import { useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message } from 'src/store/conversation/types';

import Field from './components/Field';
import Messages from './components/Messages';
import BlockWrapper from './components/BlockWrapper';
import FooterExtra from './components/FooterExtra';

const store = new ConversationStore();

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (user.socket) {
      user.socket.on('receiveMessage', (value: Message) => {
        // TODO bug we set messages in chat B but we send it for chat A
        store.pushMessage(value);
      });

      user.socket.on('changeMessage', ({ id, text }: Pick<Message, 'id' | 'text'>) => {
        store.setMessage(id, { text, isEdited: true });
      });
    }
  }, []);

  useEffect(() => {
    if (id) {
      store.fetchData(id);
    }
  }, [id]);

  if (store.isLoading || !store.data) {
    return <div>loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '75%' }}>
      <BlockWrapper borderPosition="bottom">{store.data.title}</BlockWrapper>
      <Messages store={store} />
      {/* TODO we can delete store.extra.id to save perf, we can show footerextra as absolute position height:
      store.extra.id ? '70%' : '80%' */}
      {store.extra.type ? (
        <BlockWrapper borderPosition="top">
          {store.extra.type === 'edit' ? (
            <ModeEditOutlineOutlinedIcon color="primary" />
          ) : (
            <ReplyIcon color="primary" />
          )}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" color="primary">
              {store.extra.title}
            </Typography>
            <Typography>{store.extra.text}</Typography>
          </Box>
          <IconButton sx={{ ml: 'auto' }} onClick={store.resetExtra}>
            <CloseIcon />
          </IconButton>
        </BlockWrapper>
      ) : null}
      <BlockWrapper borderPosition="top">
        <AttachFileOutlinedIcon color="primary" sx={{ cursor: 'pointer' }} />
        <Field store={store} />
        <IconButton size="small" onClick={store.submitMessage}>
          {store.extra.type ? <CheckIcon color="primary" /> : <SendIcon color="primary" />}
        </IconButton>
      </BlockWrapper>
    </Box>
  );
};

export default observer(Conversation);
