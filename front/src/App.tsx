import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import auth from './store/auth';

import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Conversation from './pages/Conversation';

const App = (): JSX.Element => {
  if (auth.isLoginForm) {
    return <Login />;
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Sidebar />
      <Grid item xs={9.5} sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
        {/* TODO think about recoil better use mobx and then rewrite it to redux */}
        <Routes>
          <Route path="/:id" element={<Conversation />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default observer(App);
