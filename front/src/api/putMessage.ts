import { Method, Route } from './types';

class PutMessage implements Route {
  method: Method = 'PUT';

  getUrl(): string {
    return '/messages';
  }

  getData() {}
}

export default new PutMessage();
