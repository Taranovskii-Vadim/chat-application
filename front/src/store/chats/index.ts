import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getChats from '../../api/getChats';

import { Chat } from './types';

// TODO add types for stores
class ChatsStore {
  data: Chat[] = [];

  isLoading = true;

  constructor() {
    makeObservable(this, {
      isLoading: observable,

      setIsLoading: action,
    });
  }

  setIsLoading = (value: boolean): void => {
    this.isLoading = value;
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
