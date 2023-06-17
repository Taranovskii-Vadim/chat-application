import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { grey } from '@mui/material/colors';
import { Box, TextField } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import user from 'src/store/user';

import Chats from 'src/components/Chats';
import BlockWrapper from 'src/components/BlockWrapper';

import Conversation from './Conversation';

const Pages = (): JSX.Element => {
  useEffect(() => {
    user.fetchData();
  }, []);

  if (user.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', maxHeight: '100vh' }}>
      <Box sx={{ width: '25%', borderRight: `1px solid ${grey['300']}` }}>
        <BlockWrapper border="bottom">
          <TextField size="small" placeholder="Добавить чат..." fullWidth />
        </BlockWrapper>
        <Chats data={user.chats} />
      </Box>
      <Routes>
        {/* TODO add lazy loading */}
        {/* TODO create start page*/}
        <Route path="/" element={<div>choose chat to start messaging</div>} />
        <Route path="/conversation/:id" element={<Conversation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );
};

export default observer(Pages);
