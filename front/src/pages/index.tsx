import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import UserStore from '../store/user';

import Sidebar from '../components/Sidebar';
import Loader from '../components/ui/Loader';

import Chat from './Chat';

const store = new UserStore();

const Pages = (): JSX.Element => {
  useEffect(() => {
    store.fetchData();
  }, []);

  if (store.isLoading || !store.data) {
    return <Loader height="100vh" />;
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Sidebar user={store.data} />
      <Grid item xs={9.5} sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
        {/* TODO think about recoil better use mobx and then rewrite it to redux */}
        {/* TODO add lazy loading maybe */}
        <Routes>
          <Route path="/:id" element={<Chat user={store.data} />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default observer(Pages);
