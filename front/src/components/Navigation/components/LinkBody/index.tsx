import { Grid, Typography } from '@mui/material';

import Flexbox from 'src/components/Flexbox';

interface Props {
  title: string;
  isEqual: boolean;
}

const COMMON = {
  width: '80%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

// TODO maybe we need better refactor this component
const LinkBody = ({ title, isEqual }: Props): JSX.Element => {
  const colorSx = { color: isEqual ? 'common.white' : 'inherit' };
  const sx = { ...COMMON, ...colorSx };

  return (
    <Grid item xs={9}>
      {/* {lastMessage ? (
        <>
          <Flexbox sx={{ mb: '3px' }}>
            <Typography variant="h6" sx={dotsSx}>
              {title}
            </Typography>
            <Typography variant="subtitle1" sx={colorSx}>
              {lastMessage.createdAt}
            </Typography>
          </Flexbox>
          <Flexbox>
            <Typography variant="subtitle1" sx={dotsSx}>
              {`${lastMessage.senderId === data?.id ? 'You:' : ''} ${lastMessage.text}`}
            </Typography>
            {unReadCount ? <Chip color="primary" size="small" label={unReadCount} /> : null}
          </Flexbox>
        </>
      ) : (
        <Typography variant="h6" sx={dotsSx}>
          {title}
        </Typography>
      )} */}
      <Typography variant="h6" sx={sx}>
        {title}
      </Typography>
    </Grid>
  );
};

export default LinkBody;
