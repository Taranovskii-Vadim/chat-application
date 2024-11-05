import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import { Box, TextField } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import user from 'src/store/user';

import Chats from 'src/components/Chats';
import Welcome from 'src/components/Welcome';
import Loader from 'src/components/ui/Loader';
import BlockWrapper from 'src/components/BlockWrapper';

import Conversation from './Conversation';

const Pages = (): JSX.Element => {
  useEffect(() => {
    user.fetchData();
  }, []);

  if (user.isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', maxHeight: '100vh' }}>
      <Box sx={{ width: '25%', borderRight: `1px solid ${grey['300']}` }}>
        <BlockWrapper border="bottom">
          <TextField size="small" placeholder="Добавить чат..." fullWidth />
        </BlockWrapper>
        <Chats data={user.chats} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '75%' }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/conversation/:id" element={<Conversation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default observer(Pages);
