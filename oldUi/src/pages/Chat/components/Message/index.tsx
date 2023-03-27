import { memo } from 'react';
import { Box, Typography } from '@mui/material';

import Flexbox from 'src/components/Flexbox';

import { Message as MessageType } from 'src/store/chat/types';

interface Props extends Pick<MessageType, 'replied' | 'isEdited' | 'createdAt' | 'text'> {
  isAuthor: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Message = ({ isAuthor, isEdited, replied, createdAt, text, onClick }: Props): JSX.Element => {
  const color = isAuthor ? '#37a123' : '#2AABEE';

  return (
    <Box
      onClick={onClick}
      sx={{ backgroundColor: isAuthor ? '#b1e8a7' : 'white', maxWidth: '55%', borderRadius: 1, p: 1, ml: 1 }}
    >
      {replied ? (
        <Box sx={{ borderLeft: `3px solid ${color}`, pl: 1 }}>
          <Typography sx={{ color }}>{replied.fullname}</Typography>
          <Typography>{replied.text}</Typography>
        </Box>
      ) : null}
      <Typography>{text}</Typography>
      <Flexbox sx={{ justifyContent: 'flex-end' }}>
        {isEdited ? <Typography sx={{ fontSize: '12px', color, mr: 1 }}>Изменено</Typography> : null}
        <Typography sx={{ textAlign: 'right', fontSize: '12px' }}>{createdAt}</Typography>
      </Flexbox>
    </Box>
  );
};

export default memo(Message);
