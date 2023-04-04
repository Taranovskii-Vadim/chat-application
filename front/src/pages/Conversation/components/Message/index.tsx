import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message as Type } from 'src/store/conversation/types';

import Icon from 'src/components/ui/Icon';
import Loader from 'src/components/ui/Loader';

interface Props {
  message: Type;
  store: ConversationStore;
}

const Message = ({ store, message }: Props): JSX.Element => {
  const isAuthor = user.data?.id === message.sender.id;

  return (
    <li key={message.id} className={`flex ${isAuthor ? 'justify-end' : 'justify-start'} mb-2 items-center`}>
      {message.isLoading ? <Loader className="mr-1" /> : null}
      {message.error ? <Icon type="error" className="mr-1 text-red-600" /> : null}
      <div
        onClick={isAuthor ? () => store.setEdited(message.id, message.text) : undefined}
        className={`${isAuthor ? 'bg-emerald-500 cursor-pointer' : 'bg-sky-500'} py-2 px-3 rounded-lg text-sm`}
      >
        <p>{message.text}</p>
        <small className="flex justify-end">
          {message.isEdited ? <span className="mr-1">Изменено</span> : null}
          <span>{message.createdAt}</span>
        </small>
      </div>
    </li>
  );
};

export default Message;
