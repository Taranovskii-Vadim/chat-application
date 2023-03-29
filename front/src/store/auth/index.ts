import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import postLogin from 'src/api/postLogin';

import { Payload, Store } from './types';

class Auth implements Store {
  isLogged = !!localStorage.getItem('token');

  constructor() {
    makeObservable(this, {
      isLogged: observable,

      setIsLogged: action,
    });
  }

  setIsLogged = (value: boolean): void => {
    this.isLogged = value;
  };

  logout = (): void => {
    window.location.href = '/';
    localStorage.clear();

    this.setIsLogged(false);
  };

  login = async (payload: Payload): Promise<void> => {
    const result = await api(postLogin, payload);

    this.setIsLogged(!!result);
  };
}

export default new Auth();
