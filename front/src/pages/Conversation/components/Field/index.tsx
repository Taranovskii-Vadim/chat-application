import { observer } from 'mobx-react-lite';

import ConversationStore from 'src/store/conversation';

import Input from 'src/components/ui/Input';

interface Props {
  store: ConversationStore;
}

const Field = ({ store }: Props): JSX.Element => (
  <Input
    placeholder="Написать сообщение..."
    value={store.currentText}
    onChange={(e) => store.setCurrentText(e.target.value)}
  />
);

export default observer(Field);
