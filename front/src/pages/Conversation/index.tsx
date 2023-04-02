import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import ConversationStore from 'src/store/conversation';

import Icon from 'src/components/ui/Icon';
import Input from 'src/components/ui/Input';
import IconButton from 'src/components/ui/IconButton';

const store = new ConversationStore();

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      store.fetchData(id);
    }
  }, [id]);

  if (store.isLoading || !store.data) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-3/4">
      <div className="h-1/10 border-b flex justify-between items-center px-4">{store.data.title}</div>
      <div className="max-h-8/10 px-4 py-2 overflow-y-auto">{JSON.stringify(store.messages)}</div>
      <div className="h-1/10 border-b flex justify-between items-center px-2 space-x-2">
        <IconButton>
          <Icon type="clip" />
        </IconButton>
        <Input placeholder="Написать сообщение..." />
        <IconButton>
          <Icon type="send" />
        </IconButton>
      </div>
    </div>
  );
};

export default observer(Conversation);
