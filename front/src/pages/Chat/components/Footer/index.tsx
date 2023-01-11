import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Box, InputBase, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import grey from '@mui/material/colors/grey';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import ChatStore from '../../../../store/chat';

// interface Props {
//   socket: any;
//   store: ChatStore;
//   currentUserId: User['id'];
// }

const Footer = (): JSX.Element => {
  const [text, setText] = useState('');
  const [isPicker, setIsPicker] = useState(false);
  //   const { data } = store;

  const handleAddMessage = async (): Promise<void> => {
    //   if (inputRef.current) {
    //     const text = inputRef.current.value;
    //     const response = await store.addMessage(currentUserId, text);
    //     if (response) {
    //       socket.emit('sendMessage', {
    //         text,
    //         ...response,
    //         senderId: currentUserId,
    //         receiverId: data.members[0],
    //       });
    //     }
    //   }
  };

  const handleEmojiClick = (emojiObject: any): void => {
    setText((prev) => prev + emojiObject.emoji);
    setIsPicker(false);
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
        <EmojiPicker
          skinTonesDisabled
          searchDisabled
          emojiVersion="5.0"
          height="300px"
          width="300px"
          onEmojiClick={handleEmojiClick}
        />
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
