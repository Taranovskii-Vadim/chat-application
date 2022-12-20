import { Suspense } from 'react';
import { Grid } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Conversation from './pages/Conversation';

const App = (): JSX.Element => (
  <Grid container sx={{ height: '100vh' }}>
    <Sidebar />
    <Grid item xs={9.5} sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/:id" element={<Conversation />} />
        </Routes>
      </Suspense>
    </Grid>
  </Grid>
);

export default App;
