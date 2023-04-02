import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';

import Icon from 'src/components/ui/Icon';
import IconButton from 'src/components/ui/IconButton';

import Field from './components/Field';

const store = new ConversationStore();

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const lastLi = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (id) {
      store.fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (lastLi.current) {
      lastLi.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [store.isLoading]);

  if (store.isLoading || !store.data) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-3/4">
      <div className="h-1/10 border-b flex justify-between items-center px-4">{store.data.title}</div>
      <ul className="h-8/10 px-4 py-2 overflow-y-auto">
        {store.messages.map((item) => {
          const isAuthor = user.data?.id === item.sender.id;

          return (
            <li key={item.id} className={`flex ${isAuthor ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`${isAuthor ? 'bg-emerald-500' : 'bg-sky-500'} py-2 px-3 rounded-lg text-sm`}>
                <p>{item.text}</p>
                <small className="flex justify-end">
                  {/* <span className="mr-1">Изменено</span> */}
                  <span>{item.createdAt}</span>
                </small>
              </div>
            </li>
          );
        })}
        <li ref={lastLi}></li>
      </ul>
      <div className="h-1/10 border-b flex justify-between items-center px-2 space-x-2">
        <IconButton>
          <Icon type="clip" />
        </IconButton>
        <Field store={store} />
        <IconButton onClick={store.createMessage}>
          <Icon type="send" />
        </IconButton>
      </div>
    </div>
  );
};

export default observer(Conversation);
