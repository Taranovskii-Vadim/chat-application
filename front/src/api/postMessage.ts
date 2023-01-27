import { Method, Route } from './types';

class PostMessage implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/messages';
  }

  getData() {}
}

export default new PostMessage();
