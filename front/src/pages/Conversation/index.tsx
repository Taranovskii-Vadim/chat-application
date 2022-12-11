import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';

import { messages } from '../../store/messages';

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const data = useRecoilValue(messages(id));

  return (
    <>
      <Box sx={{ p: '12px 16px' }}>{id}</Box>
      <Box sx={{ backgroundColor: 'blue', flex: 1, overflowY: 'scroll' }}>
        {data.map(({ id, senderId, text }) => {
          return (
            // TODO instead of 1 use real userId
            <Typography key={id} sx={{ textAlign: senderId === 1 ? 'right' : 'left' }}>
              {text}
            </Typography>
          );
        })}
      </Box>
      <Box sx={{ p: '12px 16px' }}>
        <TextField fullWidth size="small" />
      </Box>
    </>
  );
};

export default Conversation;
