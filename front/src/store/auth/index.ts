import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import postLogin from 'src/api/postLogin';

import { LoginPayload, AuthStore } from './types';

class Auth implements AuthStore {
  isLogged = !!localStorage.getItem('token');

  constructor() {
    makeObservable(this, {
      isLogged: observable,

      changeIsLogged: action,
    });
  }

  changeIsLogged = (value: boolean): void => {
    this.isLogged = value;
  };

  logout = (): void => {
    window.location.href = '/';
    localStorage.clear();
    this.isLogged = false;
  };

  signIn = async (payload: LoginPayload): Promise<void> => {
    const result = await api(postLogin, payload);

    this.changeIsLogged(!!result);
  };
}

export default new Auth();
