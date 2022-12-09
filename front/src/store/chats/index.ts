import { atom, selector } from 'recoil';

import { api } from '../../api';
import getChats from '../../api/getChats';

export const chatsState = atom({
  key: 'chatsAtom',
  default: selector({
    key: 'chatsSelector',
    get: async () => {
      const response = await api(getChats, undefined, 1);

      return response;
    },
  }),
});
