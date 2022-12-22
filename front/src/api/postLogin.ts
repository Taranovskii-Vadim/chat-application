import { Route, Method } from './types';

class PostLogin implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/auth/signIn';
  }

  getData() {}
}

export default new PostLogin();
