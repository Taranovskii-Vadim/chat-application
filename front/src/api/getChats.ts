import { Chat } from '../store/chats/types';

import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
  title: string;
  unReadCount: number;
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/chats/user/${id}`;
  }

  getData(data: ResponseDTO[]): Chat[] {
    return data;
  }
}

export default new GetChats();
