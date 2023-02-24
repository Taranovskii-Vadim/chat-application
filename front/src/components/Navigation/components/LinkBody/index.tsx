import { Grid, Typography } from '@mui/material';

import Flexbox from 'src/components/Flexbox';
import { LastMessage } from 'src/store/chats/types';

interface Props {
  title: string;
  isEqual: boolean;
  lastMessage: LastMessage | undefined;
}

const COMMON = {
  width: '80%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

// TODO maybe we need better refactor this component
const LinkBody = ({ title, isEqual, lastMessage }: Props): JSX.Element => {
  const colorSx = { color: isEqual ? 'common.white' : 'inherit' };
  const sx = { ...COMMON, ...colorSx };

  return (
    <Grid item xs={9}>
      {lastMessage ? (
        <>
          <Flexbox sx={{ mb: '3px' }}>
            <Typography variant="h6" sx={sx}>
              {title}
            </Typography>
            <Typography variant="subtitle1" sx={colorSx}>
              {lastMessage.createdAt}
            </Typography>
          </Flexbox>
          {/* <Flexbox>
            <Typography variant="subtitle1" sx={sx}>
              {`${lastMessage.senderId === data?.id ? 'You:' : ''} ${lastMessage.text}`}
            </Typography>
            {unReadCount ? <Chip color="primary" size="small" label={unReadCount} /> : null}
          </Flexbox> */}
        </>
      ) : (
        <Typography variant="h6" sx={sx}>
          {title}
        </Typography>
      )}
    </Grid>
  );
};

export default LinkBody;
