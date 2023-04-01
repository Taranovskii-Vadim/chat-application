import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import ConversationStore from 'src/store/conversation';

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
      <div className="h-1/10 border-b flex justify-between items-center px-4">{store.data.title}</div>
    </div>
  );
};

export default observer(Conversation);
