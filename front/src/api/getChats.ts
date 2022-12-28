import { CommonChat } from '../store/types';

import { CommonChatDTO, Method, Route } from './types';

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/chats/user/${id}`;
  }

  getData(data: CommonChatDTO[]): CommonChat[] {
    return data;
  }
}

export default new GetChats();
