import { CircularProgress, CircularProgressProps } from '@mui/material';

import Flexbox from '../../Flexbox';

interface Props extends CircularProgressProps {
  height: string;
}

const Loader = ({ height, ...props }: Props): JSX.Element => (
  <Flexbox sx={{ height, justifyContent: 'center' }}>
    <CircularProgress {...props} />
  </Flexbox>
);

export default Loader;
