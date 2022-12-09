import { useRecoilValue } from 'recoil';
import { Grid } from '@mui/material';

import { chatsState } from './store/chats';

const App = (): JSX.Element => {
  const chats = useRecoilValue(chatsState);

  return (
    <Grid container>
      <Grid item xs={4}>
        sidebar
      </Grid>
      {/* TODO this is sep page */}
      <Grid item xs={8}>
        maincontent
      </Grid>
    </Grid>
  );
};

export default App;
