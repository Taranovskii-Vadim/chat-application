import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import bg from 'src/assets/bg.jpg';

import user from 'src/store/user';
import Store from 'src/store/chat';
import { formatDate } from 'src/utils';
import { Edited, Message } from 'src/store/chat/types';

import Loader from 'src/components/ui/Loader';

import Header from './components/Header';
import Footer from './components/Footer';
import MessageWrapper from './components/MessageWrapper';

const store = new Store();

const Chat = (): JSX.Element => {
  const { socket } = user;
  const { id } = useParams();

  useEffect(() => {
    store.fetchData(id as string);

    socket.on('receiveMessage', (value: Omit<Message, 'createdAt'>) => {
      store.pushMessage({ ...value, createdAt: formatDate(new Date()) });
    });

    socket.on('changeMessage', ({ id, ...others }: Edited) => {
      store.updateMessage(id, { ...others, isEdited: true });
    });
  }, [id]);

  // TODO change this statement
  if (store.isLoading || !store.data || !id) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      <Header title={store.data.title} />
      <Box sx={{ flex: 1, backgroundImage: `url(${bg})`, backgroundSize: 'cover', overflowY: 'auto', p: 1 }}>
        {/* TODO we must show something if array is empty */}
        {store.messages.map((item) => (
          <MessageWrapper key={item.id} store={store} {...item} />
        ))}
      </Box>
      <Footer receiverId={store.data.companionId} chatId={+id} store={store} />
    </>
  );
};

export default observer(Chat);
