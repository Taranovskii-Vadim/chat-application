import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, IconButton } from '@mui/material';

import bg from 'src/assets/bg.jpg';

import user from 'src/store/user';
import Store from 'src/store/chat';
import chats from 'src/store/chats';
import { Message } from 'src/store/chat/types';

import Loader from 'src/components/ui/Loader';

import Header from './components/Header';
import Footer from './components/Footer';
import MessageWrapper from './components/MessageWrapper';
import Flexbox from 'src/components/Flexbox';

const store = new Store();

const Chat = (): JSX.Element | null => {
  const { socket } = user;
  const { id } = useParams();

  useEffect(() => {
    store.fetchData(id as string);

    socket.on('receiveMessage', (value: Message) => {
      store.pushMessage(value);
    });

    socket.on('changeMessage', ({ id, ...others }: Message) => {
      store.setMessage(id, { ...others, isEdited: true });
    });
  }, [id]);

  // TODO prev we had getChat request. Now we take chat from chats array sync
  const currentChat = id && chats.data.find((item) => item.id === +id);

  if (!currentChat) return null;

  return (
    <>
      <Header title={currentChat.title} />
      <Box sx={{ flex: 1, backgroundImage: `url(${bg})`, backgroundSize: 'cover', overflowY: 'auto', p: 1 }}>
        {!store.isLoading ? (
          <>
            {/* TODO we must show something if array is empty */}
            {store.messages.map((item) => (
              <MessageWrapper key={item.id} store={store} {...item} />
            ))}
          </>
        ) : (
          <Loader height="100%" />
        )}
      </Box>
      <Footer receiverId={currentChat.companionId} chatId={+id} store={store} />
    </>
  );
};

export default observer(Chat);
