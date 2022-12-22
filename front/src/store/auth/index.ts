import { action, makeObservable, observable } from 'mobx';

import { api } from '../../api';
import postLogin from '../../api/postLogin';

class AuthStore {
  //   data: UserRole = undefined;

  isLoginForm = !document.cookie.includes('token');

  constructor() {
    makeObservable(this, {
      //   data: observable,
      isLoginForm: observable,

      changeLoginForm: action,
    });
  }

  changeLoginForm = (value: boolean): void => {
    this.isLoginForm = value;
  };

  signIn = async (payload: any): Promise<void> => {
    await api(postLogin, payload);
    this.changeLoginForm(!document.cookie.includes('token'));
  };
}

export default new AuthStore();
