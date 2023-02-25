import { Chat } from 'src/store/chat/types';

import { CommonChatDTO, Method, Route } from './types';

class GetChat implements Route {
  method: Method = 'GET';

  getUrl(id?: string): string {
    return `/chats/${id}`;
  }

  getData(data: CommonChatDTO): Chat {
    return data;
  }
}

export default new GetChat();
