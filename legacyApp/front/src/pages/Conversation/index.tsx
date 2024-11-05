import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message } from 'src/store/conversation/types';

import Loader from 'src/components/ui/Loader';
import BlockWrapper from 'src/components/BlockWrapper';

import Field from './components/Field';
import Messages from './components/Messages';
import FooterExtra from './components/FooterExtra';
import Attachment from './components/Attachment';

const store = new ConversationStore();

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (user.socket) {
      user.socket.on('receiveMessage', (value: { chatId: number } & Message): void => {
        const { chatId, ...other } = value;

        if (id && +id === chatId) {
          store.pushMessage(other);
        }
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
    return <Loader />;
  }

  return (
    <>
      <BlockWrapper border="bottom">{store.data.title}</BlockWrapper>
      <Messages store={store} />
      <FooterExtra store={store} />
      <BlockWrapper>
        <Attachment store={store} />
        <Field store={store} />
        <IconButton size="small" onClick={store.submitMessage}>
          <SendIcon color="primary" />
        </IconButton>
      </BlockWrapper>
    </>
  );
};

export default observer(Conversation);
