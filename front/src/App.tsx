import { Grid } from '@mui/material';

import Sidebar from './components/Sidebar';

const App = (): JSX.Element => (
  <Grid container sx={{ height: '100vh' }}>
    <Sidebar />
    <Grid item xs={9.5}>
      maincontent
    </Grid>
  </Grid>
);

export default App;
