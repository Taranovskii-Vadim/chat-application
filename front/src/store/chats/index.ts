import { selectorFamily } from 'recoil';

import { api } from '../../api';
import getChats from '../../api/getChats';

export const chatsSelector = selectorFamily({
  key: 'chatsSelector',
  get: (userId) => async () => {
    const response = await api(getChats, undefined, Number(userId));

    return response;
  },
});
