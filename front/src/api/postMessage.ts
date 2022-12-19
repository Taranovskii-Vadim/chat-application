import { Method, Route } from './types';

class PostMessage implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/messages';
  }

  getData(data: number): number {
    return data;
  }
}

export default new PostMessage();
