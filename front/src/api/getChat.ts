import { CommonChat } from 'src/store/types';

import { Method, Route, CommonChatDTO } from './types';

class GetChat implements Route {
  method: Method = 'GET';

  getUrl(chatId?: string): string {
    return `/chats/${chatId}`;
  }

  getData(response: CommonChatDTO): CommonChat {
    return response;
  }
}

export default new GetChat();
