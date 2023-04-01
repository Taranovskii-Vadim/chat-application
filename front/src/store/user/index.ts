import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import getChats from 'src/api/getChats';
import getProfile from 'src/api/getProfile';

import { User } from '../types';
import { Chat, Store } from './types';

class UserStore implements Store {
  isLoading = true;

  socket = undefined;

  chats: Chat[] = [];

  data: User | undefined = undefined;

  constructor() {
    makeObservable(this, {
      isLoading: observable,

      setIsLoading: action,
    });
  }

  setIsLoading = async (value: boolean) => {
    this.isLoading = value;
  };

  fetchData = async (): Promise<void> => {
    try {
      this.setIsLoading(true);
      const result = await api(getProfile);
      const chats = await api(getChats);

      this.data = result;
      this.chats = chats;
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default new UserStore();
