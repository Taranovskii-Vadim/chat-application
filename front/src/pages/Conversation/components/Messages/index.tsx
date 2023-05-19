import { useEffect, useRef, useState } from 'react';
import { List, ListItem } from '@mui/material';
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
    // TODO we can delete store.extra.id to save perf, we can show footerextra as absolute position
    <List sx={{ overflowY: 'auto', height: store.extra.id ? '70%' : '80%' }}>
      {store.messages.map((item) => {
        return <Message key={item.id} message={item} store={store} />;
      })}
      <ListItem ref={lastLi} />
    </List>
  );

  // return (
  //   <ul className={`${store.extra.id ? 'h-7/10' : 'h-8/10'} px-4 py-2 overflow-y-auto`}>
  //     {store.messages.map((item) => (
  //       <Message key={item.id} message={item} store={store}/>
  //     ))}
  //     <li ref={lastLi}></li>
  //   </ul>
  // );
};

export default observer(Messages);
