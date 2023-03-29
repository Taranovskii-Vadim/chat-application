import { io, Socket } from "socket.io-client";
import { action, makeObservable, observable } from "mobx";

import { api } from "src/api";
import getProfile from "src/api/getProfile";

import { Store, User } from "./types";

class UserStore implements Store {
  isLoading = true;

  data: User | undefined = undefined;

  socket: Socket<any, any> | any = undefined;

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

      const connection = io("http://localhost:8080");
      connection.emit("addNewUser", result.id);

      this.data = result;
      this.socket = connection;
    } finally {
      this.setIsLoading(false);
    }
  };
}

export default new UserStore();
