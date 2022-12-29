import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';
import grey from '@mui/material/colors/grey';

import UserStore from 'src/store/user';

import Sidebar from 'src/components/Sidebar';
import Loader from 'src/components/ui/Loader';

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
      <Grid
        item
        xs={9.5}
        sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%', borderLeft: `1px solid ${grey['300']}` }}
      >
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
