import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Routes, Route, Navigate } from 'react-router-dom';

import user from 'src/store/user';

import Chats from 'src/components/Chats';
import Input from 'src/components/ui/Input';

import Conversation from './Conversation';

const Pages = (): JSX.Element => {
  useEffect(() => {
    user.fetchData();
  }, []);

  if (user.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex h-screen max-h-screen">
      <div className="w-1/4 border-r">
        <form className="py-2 px-4 h-1/10 border-b">
          <Input placeholder="Добавить чат" />
        </form>
        <Chats data={user.chats} />
      </div>
      <Routes>
        {/* TODO add lazy loading */}
        <Route path="/" element={<div>choose chat to start messaging</div>} />
        <Route path="/conversation/:id" element={<Conversation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default observer(Pages);
