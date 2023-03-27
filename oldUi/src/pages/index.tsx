import { useEffect, Suspense } from 'react';
import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate } from 'react-router-dom';

import user from 'src/store/user';
import { getRoutes } from 'src/routes';
import Loader from 'src/components/ui/Loader';
import Navigation from 'src/components/Navigation';

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
  }, []);

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
        <Suspense fallback={<Loader height="100vh" />}>
          {/* TODO think about recoil better use mobx and then rewrite it to redux */}
          <Routes>
            {getRoutes().map(({ id, ...props }) => (
              <Route key={id} {...props} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default observer(Pages);
