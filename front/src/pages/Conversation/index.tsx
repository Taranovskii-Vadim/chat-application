import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import ConversationStore from 'src/store/conversation';

import Icon from 'src/components/ui/Icon';
import Input from 'src/components/ui/Input';
import IconButton from 'src/components/ui/IconButton';
import user from 'src/store/user';

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
      <div className="h-8/10 px-4 py-2 overflow-y-auto">
        {store.messages.map((item) => {
          const isAuthor = user.data?.id === item.sender.id;

          return (
            <div className={`flex ${isAuthor ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`${isAuthor ? 'bg-emerald-500' : 'bg-sky-500'} py-2 px-3 rounded-lg text-sm`}>
                <p>{item.text}</p>
                <small className="flex justify-end">
                  {/* <span className="mr-1">Изменено</span> */}
                  <span>{item.createdAt}</span>
                </small>
              </div>
            </div>
          );
        })}
      </div>
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
