import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, IconButton, Typography } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import ConversationStore from 'src/store/conversation';

import BlockWrapper from '../BlockWrapper';

interface Props {
  store: ConversationStore;
}

const FooterExtra = ({ store }: Props): JSX.Element | null => {
  if (!store.extra.type) {
    return null;
  }

  return (
    <BlockWrapper borderPosition="top">
      {store.extra.type === 'edit' ? <ModeEditOutlineOutlinedIcon color="primary" /> : <ReplyIcon color="primary" />}
      <Box sx={{ ml: 2 }}>
        <Typography variant="h6" color="primary">
          {store.extra.title}
        </Typography>
        <Typography>{store.extra.text}</Typography>
      </Box>
      <IconButton sx={{ ml: 'auto' }} onClick={store.resetExtra}>
        <CloseIcon />
      </IconButton>
    </BlockWrapper>
  );
};

export default observer(FooterExtra);
