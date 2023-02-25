import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import bg from 'src/assets/bg.jpg';

import user from 'src/store/user';
import Store from 'src/store/chat';
import { formatDate } from 'src/utils';
import { Edited, Message as MessageType } from 'src/store/chat/types';

import Loader from 'src/components/ui/Loader';

import Header from './components/Header';
import Footer from './components/Footer';
import Message from './components/Message';

const store = new Store();

const Chat = (): JSX.Element => {
  const { socket, data } = user;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      store.fetchData(+id);

      socket.on('receiveMessage', (value: Omit<MessageType, 'createdAt'>) => {
        store.pushMessage({ ...value, createdAt: formatDate(new Date()) });
      });

      socket.on('changeMessage', ({ id, ...others }: Edited) => {
        store.updateMessage(id, { ...others, isEdited: true });
      });
    }
  }, [id]);

  // TODO change this statement
  if (store.isLoading || !store.data || !id) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      <Header title={store.data.title} />
      <Box sx={{ flex: 1, backgroundImage: `url(${bg})`, backgroundSize: 'cover', overflowY: 'auto', p: 1 }}>
        {store.messages.map(({ id, sender, replied, text, isEdited, createdAt }) => {
          const isAuthor = sender.id === data?.id;

          const handleReply = (): void => {
            store.setRepliedMessage({ id, text, fullname: sender.fullname });
          };

          const handleEdit = (): void => {
            store.setEdited({ id, text });
            store.setText(text);
          };

          return (
            <Message
              key={id}
              text={text}
              replied={replied}
              isEdited={isEdited}
              isAuthor={isAuthor}
              createdAt={createdAt}
              onEdit={handleEdit}
              onReply={handleReply}
            />
          );
        })}
      </Box>
      <Footer receiverId={store.data.companionId} chatId={+id} store={store} />
    </>
  );
};

export default observer(Chat);
