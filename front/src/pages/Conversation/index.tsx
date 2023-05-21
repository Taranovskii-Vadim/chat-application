import { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message } from 'src/store/conversation/types';

import BlockWrapper from 'src/components/BlockWrapper';

import Field from './components/Field';
import Messages from './components/Messages';
import FooterExtra from './components/FooterExtra';

const store = new ConversationStore();

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (user.socket) {
      user.socket.on('receiveMessage', (value: Message) => {
        // TODO bug we set messages in chat B but we send it for chat A
        // TODO bug fix message text length
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
      <BlockWrapper border="bottom">{store.data.title}</BlockWrapper>
      <Messages store={store} />
      <FooterExtra store={store} />
      <BlockWrapper>
        <AttachFileOutlinedIcon color="primary" sx={{ cursor: 'pointer' }} />
        <Field store={store} />
        <IconButton size="small" onClick={store.submitMessage}>
          <SendIcon color="primary" />
        </IconButton>
      </BlockWrapper>
    </Box>
  );
};

export default observer(Conversation);
