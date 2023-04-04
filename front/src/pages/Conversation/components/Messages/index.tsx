import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import user from 'src/store/user';
import ConversationStore from 'src/store/conversation';

import Icon from 'src/components/ui/Icon';
import Loader from 'src/components/ui/Loader';

interface Props {
  store: ConversationStore;
}

const Messages = ({ store }: Props): JSX.Element => {
  const lastLi = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastLi.current) {
      lastLi.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <ul className="h-8/10 px-4 py-2 overflow-y-auto">
      {store.messages.map((item) => {
        const isAuthor = user.data?.id === item.sender.id;

        return (
          <li key={item.id} className={`flex ${isAuthor ? 'justify-end' : 'justify-start'} mb-2 items-center`}>
            {item.isLoading ? <Loader className="mr-1" /> : null}
            {item.error ? <Icon type="error" className="mr-1 text-red-600" /> : null}
            <div
              onClick={isAuthor ? () => store.setEdited(item.id, item.text) : undefined}
              className={`${isAuthor ? 'bg-emerald-500 cursor-pointer' : 'bg-sky-500'} py-2 px-3 rounded-lg text-sm`}
            >
              <p>{item.text}</p>
              <small className="flex justify-end">
                {item.isEdited ? <span className="mr-1">Изменено</span> : null}
                <span>{item.createdAt}</span>
              </small>
            </div>
          </li>
        );
      })}
      <li ref={lastLi}></li>
    </ul>
  );
};

export default observer(Messages);
