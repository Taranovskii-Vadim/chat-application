import { selectorFamily } from 'recoil';

import { api } from '../../api';
import getMessages from '../../api/getMessages';

export const messages = selectorFamily({
  key: 'messagesSelector',
  get: (id) => async () => {
    const response = await api(getMessages, undefined, Number(id));

    return response;
  },
});
