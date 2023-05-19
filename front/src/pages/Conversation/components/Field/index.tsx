import { TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import ConversationStore from 'src/store/conversation';

interface Props {
  store: ConversationStore;
}

const Field = ({ store }: Props): JSX.Element => (
  <TextField
    fullWidth
    size="small"
    sx={{ mx: 1 }}
    value={store.currentText}
    placeholder="Написать сообщение..."
    onChange={(e) => store.setCurrentText(e.target.value)}
  />
);

export default observer(Field);
