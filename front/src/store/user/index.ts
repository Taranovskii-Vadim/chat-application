import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import getProfile from 'src/api/getProfile';

import { Profile, Store } from './types';

class User implements Store {
  isLoading = false;

  socket = undefined;

  data: Profile | undefined = undefined;

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
      const result = await api(getProfile);

      this.data = result;
    } catch (e) {
      console.error(e);
    }
  };
}

export default new User();
