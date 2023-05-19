import { Box, ListItem, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message as MessageType } from 'src/store/conversation/types';

import Loader from 'src/components/ui/Loader';

interface Props {
  message: MessageType;
  store: ConversationStore;
}

const Message = ({ message, store }: Props): JSX.Element => {
  const isAuthor = user.data?.id === message.sender.id;

  const handleEdit = (): void => {
    store.setExtra({ type: 'edit', id: message.id, text: message.text, title: 'Редактирование' });
    store.setCurrentText(message.text);
  };

  const handleReply = (): void => {
    store.setExtra({ type: 'reply', id: message.id, title: message.sender.fullname, text: message.text });
  };

  const commonActions = [{ text: 'Ответить', Icon: ReplyIcon, handler: handleReply }];
  const authorActions = [{ text: 'Редактировать', Icon: ModeEditOutlineOutlinedIcon, handler: handleEdit }];
  const actions = isAuthor ? commonActions.concat(authorActions) : commonActions;

  return (
    <ListItem sx={{ display: 'flex', justifyContent: isAuthor ? 'flex-end' : 'flex-start' }}>
      {message.isLoading ? <Loader className="mr-1" /> : null}
      {message.error ? <ErrorOutlineIcon color="error" /> : null}
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(state) => {
          const closeWith = (callback: () => void): void => {
            callback();
            state.close();
          };

          return (
            <>
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  cursor: 'pointer',
                  borderRadius: '8px',
                  maxWidth: '400px',
                  backgroundColor: isAuthor ? 'secondary.main' : 'primary.main',
                }}
                {...bindTrigger(state)}
              >
                <Typography>{message.text}</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {message.isEdited ? (
                    <Typography variant="subtitle1" component="p" sx={{ mr: 1 }}>
                      Изменено
                    </Typography>
                  ) : null}
                  <Typography variant="subtitle1" component="p">
                    {message.createdAt}
                  </Typography>
                </Box>
              </Box>
              <Menu {...bindMenu(state)}>
                {actions.map(({ Icon, text, handler }) => (
                  <MenuItem key={text} onClick={() => closeWith(handler)} sx={{ px: 2, py: 1 }}>
                    <Icon sx={{ mr: '12px' }} />
                    <ListItemText>{text}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </>
          );
        }}
      </PopupState>
    </ListItem>
  );
};

export default Message;
