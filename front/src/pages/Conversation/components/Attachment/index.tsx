import { useRef, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import IconButton from '@mui/material/IconButton';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

import ConversationStore from 'src/store/conversation';
import { Badge } from '@mui/material';

interface Props {
  store: ConversationStore;
}

const Attachment = ({ store }: Props): JSX.Element => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleOpenFileWindow = (): void => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSetFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;

    if (files) {
      store.setFile(files[0]);
    }
  };

  return (
    <>
      <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleSetFile} />
      <IconButton size="small" onClick={handleOpenFileWindow}>
        <AttachFileOutlinedIcon color="primary" />
        {store.file ? <Badge badgeContent="1" /> : null}
      </IconButton>
    </>
  );
};

export default observer(Attachment);
