import { Method, Route } from './types';

class PostFile implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/messages/upload';
  }

  getData() {}
}

export default new PostFile();
