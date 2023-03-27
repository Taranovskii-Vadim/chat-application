import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import EmojiPicker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, InputBase, IconButton, ClickAwayListener } from '@mui/material';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';

import Store from 'src/store/chat';

import FooterExtra from '../FooterExtra';

import Flexbox from 'src/components/Flexbox';

interface Props {
  store: Store;
  onSubmit: () => void;
}

// TODO memo this component
const Footer = ({ store, onSubmit }: Props): JSX.Element => {
  const { replied, edited } = store;

  const [isPicker, setIsPicker] = useState(false);

  const handleEmojiClick = (emojiObject: any): void => {
    // TODO we set emoji only in the end of the string, even if the cursor stands in the begining or in the middle
    store.setText(store.text + emojiObject.emoji);
  };

  return (
    <Box>
      {edited ? (
        <FooterExtra
          second={edited.text}
          first="Редактирование"
          Icon={EditOutlinedIcon}
          onClick={() => store.setEdited(undefined)}
        />
      ) : null}
      {replied ? (
        <FooterExtra
          Icon={ReplyIcon}
          second={replied.text}
          first={replied.fullname}
          onClick={() => store.setRepliedMessage(undefined)}
        />
      ) : null}
      <Flexbox sx={{ p: 1, borderLeft: `1px solid ${grey['300']}`, backgroundColor: 'white' }}>
        <AttachFileIcon />
        <InputBase
          multiline
          value={store.text}
          placeholder="Write a message..."
          onChange={(e) => store.setText(e.target.value)}
          sx={{ mr: 1, ml: 1, flex: 1, maxHeight: '130px', overflow: 'auto', paddingBottom: '6px' }}
        />
        {isPicker ? (
          <ClickAwayListener onClickAway={() => setIsPicker(false)}>
            <Box sx={{ position: 'absolute', bottom: '60px', right: '10px' }}>
              <EmojiPicker
                width="300px"
                height="300px"
                searchDisabled
                skinTonesDisabled
                emojiVersion="5.0"
                onEmojiClick={handleEmojiClick}
              />
            </Box>
          </ClickAwayListener>
        ) : null}
        <IconButton size="small" sx={{ mr: 1 }} onClick={() => setIsPicker((prev) => !prev)}>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <IconButton size="small" color="primary" onClick={onSubmit}>
          <SendIcon />
        </IconButton>
      </Flexbox>
    </Box>
  );
};

export default observer(Footer);
