import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Routes, Route } from 'react-router-dom';

import user from 'src/store/user';
import Loader from 'src/components/ui/Loader';
import Navigation from 'src/components/Navigation';

import Chat from './Chat';

// const STYLES: BoxProps['sx'] = {
//   height: '38px',
//   pt: 1,
//   pr: 2,
//   pb: 1,
//   pl: 2,
//   borderBottom: `1px solid ${grey['300']}`,
// };

// TODO check component perfomance
const Pages = (): JSX.Element => {
  useEffect(() => {
    user.fetchData();
  }, [user.data]);

  if (user.isLoading) {
    return <Loader height="100vh" />;
  }

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid item xs={2.5}>
        {/* <Box sx={STYLES}>
          <TextField size="small" label="Добавить чат" placeholder="Логин пользователя" fullWidth />
        </Box> */}
        <Navigation />
      </Grid>
      <Grid item xs={9.5} sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
        {/* TODO think about recoil better use mobx and then rewrite it to redux */}
        {/* TODO add lazy loading maybe */}
        <Routes>
          <Route path="/:id" element={<Chat />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default observer(Pages);
