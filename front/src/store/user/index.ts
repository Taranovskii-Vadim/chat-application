import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import getProfile from '../../api/getProfile';

import { Store, User } from './types';

class UserStore implements Store {
  data: User | undefined = undefined;

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
      const result = await api(getProfile);

      this.data = result;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default new UserStore();
