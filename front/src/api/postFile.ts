import { Method, Route } from './types';

class PostFile implements Route {
  method: Method = 'POST';

  getUrl(id?: string): string {
    return `/messages/upload/${id}`;
  }

  getData() {}
}

export default new PostFile();
