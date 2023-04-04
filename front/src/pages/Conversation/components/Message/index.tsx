import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';
import { Message as Type } from 'src/store/conversation/types';

import Icon from 'src/components/ui/Icon';
import Loader from 'src/components/ui/Loader';
import IconButton from 'src/components/ui/IconButton';

interface Props {
  message: Type;
  openId: number;
  store: ConversationStore;
  setOpenId: (value: number) => void;
}

const Message = ({ store, openId, message, setOpenId }: Props): JSX.Element => {
  const isOpen = openId === message.id;
  const isAuthor = user.data?.id === message.sender.id;

  const handleSetOpenId = (): void => setOpenId(message.id);

  const handleEdit = (): void => {
    store.setEdited(message.id, message.text);
    handleSetOpenId();
  };

  return (
    <li key={message.id} className={`flex ${isAuthor ? 'justify-end' : 'justify-start'} mb-2 items-center`}>
      {message.isLoading ? <Loader className="mr-1" /> : null}
      {message.error ? <Icon type="error" className="mr-1 text-red-600" /> : null}
      <div
        onClick={handleSetOpenId}
        className={`${
          isAuthor ? 'bg-emerald-500' : 'bg-sky-500'
        } cursor-pointer py-2 px-3 rounded-lg text-sm hover:scale-105 ease-in duration-100`}
      >
        <p>{message.text}</p>
        <small className="flex justify-end">
          {message.isEdited ? <span className="mr-1">Изменено</span> : null}
          <span>{message.createdAt}</span>
        </small>
      </div>

      <div className={`ml-2 ${isOpen ? 'block' : 'hidden'}`}>
        {isAuthor ? (
          <IconButton onClick={handleEdit}>
            <Icon type="edit" />
          </IconButton>
        ) : null}
        <IconButton>
          <Icon type="reply" />
        </IconButton>
      </div>
    </li>
  );
};

export default Message;
