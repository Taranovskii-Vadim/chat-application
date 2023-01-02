import { format } from 'date-fns';

import { Chat } from '../store/chats/types';

import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
  title: string;
  unReadCount: number;
  lastMessageTime: Date;
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/chats';
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data.map(({ lastMessageTime, ...others }) => ({
      lastMessageTime: format(new Date(lastMessageTime), 'dd.mm.yyyy'),
      ...others,
    }));
  }
}

export default new GetChats();
