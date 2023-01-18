import { useState } from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem, Box, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import Flexbox from '../../../../components/Flexbox';

interface Props {
  text: string;
  createdAt: string;
  isAuthor: boolean;
}

const Message = ({ isAuthor, text, createdAt }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
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
      <Flexbox sx={{ justifyContent: isAuthor ? 'flex-end' : 'flex-start', mb: 1 }}>
        <Box
          onClick={handleClick}
          sx={{ backgroundColor: isAuthor ? '#b1e8a7' : 'white', maxWidth: '55%', borderRadius: 1, p: 1 }}
        >
          <Typography>{text}</Typography>
          <Typography sx={{ textAlign: 'right', fontSize: '12px' }}>{createdAt}</Typography>
        </Box>
      </Flexbox>
    </>
  );
};

export default Message;
