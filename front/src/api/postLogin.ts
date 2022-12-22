import { axiosInsatnce } from '.';
import { Route, Method } from './types';

class PostLogin implements Route {
  method: Method = 'POST';

  getUrl(): string {
    return '/auth/signIn';
  }

  getData({ access_token }: { access_token: string }): string {
    axiosInsatnce.defaults.headers.common = { Authorization: `bearer ${access_token}` };

    localStorage.setItem('token', access_token);

    return access_token;
  }
}

export default new PostLogin();
