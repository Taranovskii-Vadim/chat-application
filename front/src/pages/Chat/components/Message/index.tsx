import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { ListItemIcon, ListItemText, Menu, MenuItem, Box, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { Replied } from '../../../../store/chat/types';

import Flexbox from '../../../../components/Flexbox';

interface Props {
  text: string;
  createdAt: string;
  isAuthor: boolean;
  replied?: Replied;
  onReply: () => void;
}

const Message = ({ isAuthor, text, replied, createdAt, onReply }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleReply = (): void => {
    onReply();
    handleClose();
  };

  const handleCopy = (): void => {
    copy(text);
    handleClose();
  };

  return (
    <>
      <Flexbox sx={{ justifyContent: isAuthor ? 'flex-end' : 'flex-start', mb: 1 }}>
        <Box
          onClick={handleClick}
          sx={{ backgroundColor: isAuthor ? '#b1e8a7' : 'white', maxWidth: '55%', borderRadius: 1, p: 1 }}
        >
          {replied ? (
            <Box sx={{ borderLeft: `3px solid ${isAuthor ? '#37a123' : '#2AABEE'}`, pl: 1 }}>
              <Typography sx={{ color: isAuthor ? '#37a123' : '#2AABEE' }}>{replied.fullname}</Typography>
              <Typography>{replied.text}</Typography>
            </Box>
          ) : null}
          <Typography>{text}</Typography>
          <Typography sx={{ textAlign: 'right', fontSize: '12px' }}>{createdAt}</Typography>
        </Box>
      </Flexbox>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleReply}>
          <ListItemIcon>
            <ReplyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ответить</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PushPinOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Закрепить</ListItemText>
        </MenuItem>
        {isAuthor ? (
          <MenuItem onClick={handleClose}>
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

export default Message;
