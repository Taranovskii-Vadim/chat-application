import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import EmojiPicker from 'emoji-picker-react';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReplyIcon from '@mui/icons-material/Reply';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import user from '../../store/user';
import { formatDate } from '../../utils';
import ChatStore from '../../store/chat';
import Flexbox from '../../components/Flexbox';
import Loader from '../../components/ui/Loader';
import { Message as MessageType } from '../../store/chat/types';

import background from '../../assets/bg.jpg';

import Message from './components/Message';

const store = new ChatStore();

// TODO fix any later

interface Props {
  socket: any;
}

const Chat = ({ socket }: Props): JSX.Element => {
  const [text, setText] = useState('');
  const [isPicker, setIsPicker] = useState(false);
  const [repliedMessage, setRepliedMessage] = useState<Pick<MessageType, 'id' | 'text' | 'sender'>>();

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

  const handleAddMessage = async (): Promise<void> => {
    try {
      if (!user.data) return;

      const response = await store.addMessage(user.data.id, text);

      if (!response || !data) return;

      socket.emit('sendMessage', {
        text,
        ...response,
        senderId: user.data.id,
        receiverId: data.members[0],
      });
    } finally {
      setText('');
    }
  };

  const handleEmojiClick = (emojiObject: any): void => {
    setText((prev) => prev + emojiObject.emoji);
  };

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
        {store.messages.map(({ id, sender, text, isLoading, createdAt }) => {
          const isAuthor = sender.id === user.data?.id;

          const handleReply = (): void => {
            setRepliedMessage({ id, text, sender });
          };

          return <Message key={id} text={text} isAuthor={isAuthor} createdAt={createdAt} onReply={handleReply} />;
        })}
      </Box>
      {repliedMessage ? (
        <Flexbox sx={{ p: 1, borderLeft: `1px solid ${grey['300']}` }}>
          <Flexbox>
            <ReplyIcon color="primary" sx={{ mr: 1 }} />
            <Box>
              <Typography color="primary">{repliedMessage.sender.fullname}</Typography>
              <Typography>{repliedMessage.text}</Typography>
            </Box>
          </Flexbox>
          <IconButton size="small" onClick={() => setRepliedMessage(undefined)}>
            <CloseIcon />
          </IconButton>
        </Flexbox>
      ) : null}
      <Flexbox sx={{ p: 1, borderLeft: `1px solid ${grey['300']}` }}>
        <AttachFileIcon />
        <InputBase
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mr: 1, ml: 1, flex: 1, maxHeight: '130px', overflow: 'auto', paddingBottom: '6px' }}
          placeholder="Write a message..."
        />
        {isPicker ? (
          <Box sx={{ position: 'absolute', bottom: '60px', right: '10px' }}>
            <EmojiPicker
              skinTonesDisabled
              searchDisabled
              emojiVersion="5.0"
              height="300px"
              width="300px"
              onEmojiClick={handleEmojiClick}
            />
          </Box>
        ) : null}
        <IconButton size="small" sx={{ mr: 1 }} onClick={() => setIsPicker((prev) => !prev)}>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        {/* TODO disable if input is empty */}
        {/* disabled={store.isFormLoading} */}
        <IconButton size="small" color="primary" onClick={handleAddMessage}>
          <SendIcon />
        </IconButton>
      </Flexbox>
    </>
  );
};

export default observer(Chat);
