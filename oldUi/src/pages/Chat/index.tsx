import { EventHandler, Fragment, SyntheticEvent, UIEvent, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import bg from 'src/assets/bg.jpg';

import user from 'src/store/user';
import Store from 'src/store/chat';
import chats from 'src/store/chats';
import { Message } from 'src/store/chat/types';

import Loader from 'src/components/ui/Loader';

import Header from './components/Header';
import Footer from './components/Footer';
import MessageWrapper from './components/MessageWrapper';

const store = new Store();

const Chat = (): JSX.Element | null => {
  const { socket } = user;
  const { id } = useParams();
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollToLastMessage = (): void => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scroll({ top: ref.current.scrollHeight, behavior: 'smooth' });
      }
    }, 0);
  };

  useEffect(() => {
    if (id) {
      store.fetchData(+id);

      socket.on('receiveMessage', (value: Message) => {
        // TODO bug we set messages in chat B but we send it for chat A
        store.pushMessage(value);
        // TODO we can call it here but bad practise in my opinion
        // Better create fab button when we click it we will scroll to bottom
        // handleScrollToLastMessage();
      });

      socket.on('changeMessage', ({ id, ...others }: Message) => {
        store.setMessage(id, { ...others, isEdited: true });
      });
    }
  }, [id]);

  // TODO prev we had getChat request. Now we take chat from chats array sync
  const currentChat = id && chats.data.find((item) => item.id === +id);

  if (!currentChat) return null;

  const handleCreateUpdateMessage = (): void => {
    if (store.edited) {
      store.updateMessage(currentChat.companionId);
    } else {
      store.createMessage(+id, currentChat.companionId);

      handleScrollToLastMessage();
    }
  };

  return (
    <>
      <Header title={currentChat.title} />
      <Box
        ref={ref}
        sx={{ flex: 1, backgroundImage: `url(${bg})`, backgroundSize: 'cover', overflowY: 'scroll', p: 1 }}
      >
        {!store.isLoading ? (
          <>
            {store.messages.map((item, idx) => (
              <MessageWrapper key={item.id} store={store} {...item} />
            ))}
          </>
        ) : (
          <Loader height="100%" />
        )}
      </Box>
      <Footer store={store} onSubmit={handleCreateUpdateMessage} />
    </>
  );
};

export default observer(Chat);
