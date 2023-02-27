import { CommonChat } from 'src/store/types';
import { CommonChatDTO, Method, Route } from './types';

class GetChat implements Route {
  method: Method = 'GET';

  getUrl(id?: string): string {
    return `/chats/${id}`;
  }

  getData(data: CommonChatDTO): CommonChat {
    return data;
  }
}

export default new GetChat();
