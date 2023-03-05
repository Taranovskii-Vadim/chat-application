import { useState, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import ReplyIcon from '@mui/icons-material/Reply';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import user from 'src/store/user';
import Store from 'src/store/chat';
import { Message as MessageType } from 'src/store/chat/types';

import Flexbox from 'src/components/Flexbox';
import Loader from 'src/components/ui/Loader';

import Message from '../Message';

interface Props extends MessageType {
  store: Store;
}

const MessageWrapper = ({ store, id, sender, text, isError, isLoading, ...message }: Props): JSX.Element => {
  const { data } = user;
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);

  const isAuthor = sender.id === data?.id;
  const isPinned = message.isPinned;

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleReply = (): void => {
    store.setRepliedMessage({ id, text, fullname: sender.fullname });
    handleClose();
  };

  const handleEdit = (): void => {
    store.setEdited({ id, text });
    store.setText(text);
    handleClose();
  };

  const handlePin = (): void => {
    // TODO maybe store messages with uuid in db. It helps to use only string type, not string|number
    store.pinMessage(id as number, !isPinned);
    handleClose();
  };

  const handleCopy = (): void => {
    copy(text);
    handleClose();
  };

  return (
    <>
      <Flexbox sx={{ justifyContent: isAuthor ? 'flex-end' : 'flex-start', mb: 1 }}>
        {isLoading ? <Loader size={20} /> : null}
        {isError ? <ErrorOutlineOutlinedIcon color="error" fontSize="small" /> : null}
        <Message isAuthor={isAuthor} text={text} onClick={handleClick} {...message} />
      </Flexbox>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      >
        <MenuItem onClick={handleReply}>
          <ListItemIcon>
            <ReplyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ответить</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePin}>
          <ListItemIcon>
            <PushPinOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{isPinned ? 'Открепить' : 'Закрепить'}</ListItemText>
        </MenuItem>
        {isAuthor ? (
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Изменить</ListItemText>
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleCopy}>
          <ListItemIcon>
            <ContentCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Копировать текст</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShortcutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Переслать</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Удалить</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CheckCircleOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Выделить</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MessageWrapper;
