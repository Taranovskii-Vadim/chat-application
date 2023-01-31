import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import user from '../../store/user';
import { formatDate } from '../../utils';
import ChatStore from '../../store/chat';
import Flexbox from '../../components/Flexbox';
import Loader from '../../components/ui/Loader';
import { Edited, Message as MessageType } from '../../store/chat/types';

import background from '../../assets/bg.jpg';

import Message from './components/Message';
import FormFooter from './components/FormFooter';

const store = new ChatStore();

// TODO fix any later

interface Props {
  socket: any;
}

const Chat = ({ socket }: Props): JSX.Element => {
  const { data } = store;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      store.fetchData(+id);
    }
  }, [id]);

  useEffect(() => {
    socket.on('receiveMessage', (data: Omit<MessageType, 'createdAt'>) => {
      store.pushMessage({ ...data, createdAt: formatDate(new Date()) });
    });

    socket.on('changeMessage', ({ id, ...others }: Edited) => {
      store.updateMessage(id, { ...others, isEdited: true });
    });
  }, []);

  if (store.isLoading || !data) {
    return <Loader height="100vh" />;
  }

  return (
    <>
      {/* TODO sep component */}
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
      {/* TODO sep component */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1, backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
        {store.messages.map(({ id, sender, replied, text, isEdited, isLoading, createdAt }) => {
          const isAuthor = sender.id === user.data?.id;

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
      <FormFooter store={store} socket={socket} />
    </>
  );
};

export default observer(Chat);
