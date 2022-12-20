import { selectorFamily } from 'recoil';

import { api } from '../../api';
import getMessages from '../../api/getMessages';

export const messagesSelector = selectorFamily({
  key: 'messagesSelector',
  get: (chatId) => async () => {
    const response = await api(getMessages, undefined, Number(chatId));

    return response;
  },
});
