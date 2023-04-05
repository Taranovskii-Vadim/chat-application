import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message } from 'src/store/conversation/types';

import Icon from 'src/components/ui/Icon';
import IconButton from 'src/components/ui/IconButton';

import Field from './components/Field';
import Messages from './components/Messages';

const store = new ConversationStore();

const Conversation = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (user.socket) {
      user.socket.on('receiveMessage', (value: Message) => {
        // TODO bug we set messages in chat B but we send it for chat A
        store.pushMessage(value);
      });
    }
  }, []);

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
      <Messages store={store} />
      {store.edited.id ? (
        // TODO sep component
        <div className="h-1/10 pl-4 pr-2 flex items-center border-t">
          <Icon type="edit" className="text-sky-500" />
          <div className="ml-3">
            <h6 className="font-semibold text-sky-500 text-sm">Редактирование</h6>
            <p className="text-sm">{store.edited.text}</p>
          </div>
          <IconButton className="ml-auto" onClick={() => store.resetEdited()}>
            <Icon type="close" />
          </IconButton>
        </div>
      ) : null}
      <div className="h-1/10 border-b flex justify-between items-center px-2 space-x-2">
        <IconButton>
          <Icon type="clip" />
        </IconButton>
        <Field store={store} />
        <IconButton onClick={store.submitMessage}>
          <Icon type={store.edited.id ? 'check' : 'send'} />
        </IconButton>
      </div>
    </div>
  );
};

export default observer(Conversation);
