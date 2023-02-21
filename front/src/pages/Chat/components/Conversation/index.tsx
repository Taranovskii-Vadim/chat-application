import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { formatDate } from 'src/utils';

import user from 'src/store/user';
import Store from 'src/store/conversation';
import { Edited, Message as MessageType } from 'src/store/conversation/types';

import Message from '../Message';

interface Props {
  socket: any;
  store: Store;
  chatId: number;
}

const Conversation = ({ socket, store, chatId }: Props): JSX.Element => {
  useEffect(() => {
    store.fetchData(chatId);

    socket.on('receiveMessage', (data: Omit<MessageType, 'createdAt'>) => {
      store.pushMessage({ ...data, createdAt: formatDate(new Date()) });
    });

    socket.on('changeMessage', ({ id, ...others }: Edited) => {
      store.updateMessage(id, { ...others, isEdited: true });
    });
  }, []);

  if (store.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {store.data.map(({ id, sender, replied, text, isEdited, isLoading, createdAt }) => {
        const isAuthor = sender.id === user.data?.id;

        const handleReply = (): void => {
          store.setRepliedMessage({ id, text, fullname: sender.fullname });
        };

        const handleEdit = (): void => {
          store.setEdited({ id, text });
          store.setText(text);
        };

        return (
          <Message
            key={id}
            text={text}
            replied={replied}
            isEdited={isEdited}
            isAuthor={isAuthor}
            createdAt={createdAt}
            onEdit={handleEdit}
            onReply={handleReply}
          />
        );
      })}
    </>
  );
};

export default observer(Conversation);
