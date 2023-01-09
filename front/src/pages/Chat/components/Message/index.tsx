import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Flexbox from '../../../../components/Flexbox';

interface Props {
  text: string;
  createdAt: string;
  isAuthor: boolean;
}

const Message = ({ isAuthor, text, createdAt }: Props): JSX.Element => (
  <Flexbox sx={{ justifyContent: isAuthor ? 'flex-end' : 'flex-start', mb: 1 }}>
    <Box sx={{ backgroundColor: isAuthor ? '#b1e8a7' : 'white', maxWidth: '55%', borderRadius: 1, p: 1 }}>
      <Typography>{text}</Typography>
      <Typography sx={{ textAlign: 'right', fontSize: '12px' }}>{createdAt}</Typography>
    </Box>
  </Flexbox>
);

export default Message;
