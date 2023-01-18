import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Box, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import grey from '@mui/material/colors/grey';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

// TODO add alias
import user from '../../../../store/user';
import ChatStore from '../../../../store/chat';

interface Props {
  socket: any;
  store: ChatStore;
}

const Footer = ({ store, socket }: Props): JSX.Element => {
  const [text, setText] = useState('');
  const [isPicker, setIsPicker] = useState(false);
  const { data } = store;

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
    <Box sx={{ display: 'flex', alignItems: 'end', p: 1, borderLeft: `1px solid ${grey['300']}` }}>
      <IconButton size="small">
        <AttachFileIcon />
      </IconButton>
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
    </Box>
  );
};

export default Footer;
