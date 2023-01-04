import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChats from '../../api/getChats';

import { Chat, OnlineUser } from './types';

// TODO add types for stores
class ChatsStore {
  data: Chat[] = [];

  isLoading = true;

  constructor() {
    makeObservable(this, {
      data: observable,
      isLoading: observable,

      setIsOnline: action,
      setIsLoading: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
  };

  setIsOnline = (onlineUsers: OnlineUser[]): void => {
    this.data.map((item) => {
      item.isOnline = onlineUsers.map(({ id }) => id).includes(item.members[0]);

      return item;
    });
  };

  fetchData = async (): Promise<void> => {
    try {
      this.setIsLoading(true);

      const result = await api(getChats);

      this.data = result;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default ChatsStore;
