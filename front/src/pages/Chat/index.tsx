import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import bg from 'src/assets/bg.jpg';

import ChatStore from 'src/store/chat';
import Loader from 'src/components/ui/Loader';
import ConversationStore from 'src/store/conversation';

import Header from './components/Header';
import Footer from './components/Footer';
import Conversation from './components/Conversation';

const chatStore = new ChatStore();
const conversationStore = new ConversationStore();

// TODO fix any later

interface Props {
  // TODO maybe store socket in context
  socket: any;
}

const Chat = ({ socket }: Props): JSX.Element => {
  const { data } = chatStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      chatStore.fetchData(+id);
    }
  }, [id]);

  // TODO change this statement
  if (chatStore.isLoading || !data || !id) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      <Header title={data.title} />
      <Box sx={{ flex: 1, backgroundImage: `url(${bg})`, backgroundSize: 'cover', overflowY: 'auto', p: 1 }}>
        <Conversation store={conversationStore} chatId={+id} socket={socket} />
      </Box>
      <Footer receiverId={data.companionId} chatId={+id} store={conversationStore} socket={socket} />
    </>
  );
};

export default observer(Chat);
