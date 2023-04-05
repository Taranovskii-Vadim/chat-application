import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import ConversationStore from 'src/store/conversation';

import Message from '../Message';

interface Props {
  store: ConversationStore;
}

const Messages = ({ store }: Props): JSX.Element => {
  const [openId, setOpenId] = useState(0);
  const lastLi = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastLi.current) {
      lastLi.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenMenu = (value: number): void => {
    setOpenId((prev) => (prev === value ? 0 : value));
  };

  return (
    <ul className={`${store.edited.id ? 'h-7/10' : 'h-8/10'} px-4 py-2 overflow-y-auto`}>
      {store.messages.map((item) => (
        <Message key={item.id} message={item} store={store} openId={openId} setOpenId={handleOpenMenu} />
      ))}
      <li ref={lastLi}></li>
    </ul>
  );
};

export default observer(Messages);
