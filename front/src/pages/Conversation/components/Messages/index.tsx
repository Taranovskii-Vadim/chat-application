import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import ConversationStore from 'src/store/conversation';

import Message from '../Message';

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
      {store.messages.map((item) => (
        <Message key={item.id} message={item} store={store} />
      ))}
      <li ref={lastLi}></li>
    </ul>
  );
};

export default observer(Messages);
