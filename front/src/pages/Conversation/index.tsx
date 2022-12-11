import { Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Box sx={{ p: '12px 16px' }}>{id}</Box>
      <Box sx={{ backgroundColor: 'blue', flex: 1, overflowY: 'scroll' }}></Box>
      <Box sx={{ p: '12px 16px' }}>
        <TextField fullWidth size="small" />
      </Box>
    </>
  );
};

export default Conversation;
