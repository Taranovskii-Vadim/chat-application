import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, TextField } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import user from 'src/store/user';

import Chats from 'src/components/Chats';

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
      {/* TODO change bg color later */}
      <Box sx={{ width: '25%', borderRight: '1px solid black' }}>
        {/* <Box component="form">
          <TextField size="small" placeholder="Добавить чат" />
        </Box> */}
        <Chats data={user.chats} />
      </Box>
      <Routes>
        {/* TODO add lazy loading */}
        <Route path="/" element={<div>choose chat to start messaging</div>} />
        <Route path="/conversation/:id" element={<Conversation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Box>
  );

  // return (
  //   <div className="flex h-screen max-h-screen">
  //     <div className="w-1/4 border-r">
  //       <form className="py-2 px-4 h-1/10 border-b">
  //         <Input />
  //       </form>
  //       <Chats data={user.chats} />
  //     </div>
  //   </div>
  // );
};

export default observer(Pages);
