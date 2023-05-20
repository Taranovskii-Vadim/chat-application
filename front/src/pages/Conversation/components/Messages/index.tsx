import { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List, ListItem } from '@mui/material';

import ConversationStore from 'src/store/conversation';

import Message from '../Message';
import { DEFAULT_BG } from './constants';

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
    <List sx={{ flex: 1, overflowY: 'auto', backgroundSize: 'contain', backgroundImage: `url(${DEFAULT_BG})` }}>
      {store.messages.map((item) => (
        <Message key={item.id} message={item} store={store} />
      ))}
      <ListItem ref={lastLi} />
    </List>
  );
};

export default observer(Messages);
