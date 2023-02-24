import { User } from 'src/store/user/types';

import { CommonUserDTO, Method, Route } from './types';

class GetProfile implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/auth/profile';
  }

  getData(data: Pick<CommonUserDTO, 'id'>): User {
    return data;
  }
}

export default new GetProfile();
