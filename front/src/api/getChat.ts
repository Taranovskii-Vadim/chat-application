import { Chat } from '../store/types';

import { CommonChatDTO, Method, Route } from './types';

class GetChat implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/chats/${id}`;
  }

  getData(data: CommonChatDTO): Chat {
    return data;
  }
}

export default new GetChat();
