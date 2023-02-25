import { Method, Route } from './types';

class PutChat implements Route {
  method: Method = 'PUT';

  getUrl(): string {
    return '/chats';
  }

  getData() {}
}

export default new PutChat();
