import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import { formatDate } from '../../utils';
import ChatStore from '../../store/chat';
import { User } from '../../store/user/types';
import Flexbox from '../../components/Flexbox';
import Loader from '../../components/ui/Loader';
import { Message as MessageType } from '../../store/chat/types';

import background from '../../assets/bg.jpg';

import Footer from './components/Footer';
import Message from './components/Message';

const store = new ChatStore();

// TODO fix any later

interface Props {
  socket: any;
  currentUserId: User['id'];
}

const Chat = ({ socket, currentUserId }: Props): JSX.Element => {
  const { data } = store;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      store.fetchData(+id);
    }
  }, [id]);

  useEffect(() => {
    socket.on('receiveMessage', (data: Omit<MessageType, 'createdAt'>) => {
      store.setMessage({ ...data, createdAt: formatDate(new Date()) });
    });
  }, []);

  if (store.isLoading || !data) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      <Flexbox sx={{ height: '38px', padding: '8px 16px', borderLeft: `1px solid ${grey['300']}` }}>
        <Typography variant="h6">{data.title}</Typography>
        <Box>
          <IconButton size="small" sx={{ mr: 1 }}>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton size="small">
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>
      </Flexbox>
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1, backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
        {store.messages.map(({ id, senderId, text, isLoading, createdAt }) => {
          const isAuthor = senderId === currentUserId;

          return <Message key={id} isAuthor={isAuthor} text={text} createdAt={createdAt} />;
        })}
      </Box>
      <Footer />
    </>
  );
};

export default observer(Chat);
