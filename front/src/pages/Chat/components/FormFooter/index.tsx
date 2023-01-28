import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import EmojiPicker from 'emoji-picker-react';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import ChatStore from '../../../../store/chat';

import Flexbox from '../../../../components/Flexbox';

interface Props {
  socket: any;
  store: ChatStore;
}

const FormFooter = ({ socket, store }: Props): JSX.Element => {
  const { data, replied } = store;

  const [text, setText] = useState('');
  const [isPicker, setIsPicker] = useState(false);

  const handleAddMessage = async (): Promise<void> => {
    try {
      const response = await store.addMessage(text);

      if (!response || !data) return;

      socket.emit('sendMessage', {
        text,
        ...response,
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
      {replied ? (
        <Flexbox sx={{ p: 1, borderLeft: `1px solid ${grey['300']}` }}>
          <Flexbox>
            <ReplyIcon color="primary" sx={{ mr: 1 }} />
            <Box>
              <Typography color="primary">{replied.fullname}</Typography>
              <Typography>{replied.text}</Typography>
            </Box>
          </Flexbox>
          <IconButton size="small" onClick={() => store.setRepliedMessage(undefined)}>
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

export default observer(FormFooter);
