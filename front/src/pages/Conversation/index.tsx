import { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message } from 'src/store/conversation/types';

import Field from './components/Field';
import Messages from './components/Messages';
// import FooterExtra from './components/FooterExtra';

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
      {/* TODO can move to sep wrapper component */}
      <Box sx={{ px: 2, height: '50px', display: 'flex', alignItems: 'center', borderBottom: '1px solid black' }}>
        {store.data.title}
      </Box>
      <Messages store={store} />
      {/* TODO we can delete store.extra.id to save perf, we can show footerextra as absolute position height:
      store.extra.id ? '70%' : '80%' */}
      {/* {store.extra.type ? (
        <FooterExtra
          icon={store.extra.type}
          text={store.extra.text}
          onClose={store.resetExtra}
          title={store.extra.title}
        />
      ) : null} */}
      <Box sx={{ height: '50px', display: 'flex', alignItems: 'center', borderTop: '1px solid black' }}>
        <IconButton>
          <AttachFileOutlinedIcon color="primary" />
        </IconButton>
        <Field store={store} />
        <IconButton onClick={store.submitMessage}>
          {store.extra.type ? <CheckIcon color="primary" /> : <SendIcon color="primary" />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default observer(Conversation);
