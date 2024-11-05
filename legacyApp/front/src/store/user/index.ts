import { io, Socket } from 'socket.io-client';
import { action, makeObservable, observable } from 'mobx';

import { api } from 'src/api';
import getChats from 'src/api/getChats';
import getProfile from 'src/api/getProfile';

import { User } from '../types';
import { Chat, Store } from './types';

class UserStore implements Store {
  isLoading = true;

  chats: Chat[] = [];

  data: U<User> = undefined;

  socket: U<Socket<any, any>> = undefined;

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

      const connection = io('http://localhost:8080');
      connection.emit('addNewUser', result.id);

      this.data = result;
      this.chats = chats;
      this.socket = connection;
    } catch (e) {
      console.error(e);
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default new UserStore();
