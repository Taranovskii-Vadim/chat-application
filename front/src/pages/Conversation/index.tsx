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
  }, []);

  if (store.isLoading || !store.data) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-3/4">
      <div className="h-1/10 border-b">{store.data.title}</div>
      <div className="max-h-9/10">conversation № {id}</div>
    </div>
  );
};

export default observer(Conversation);
