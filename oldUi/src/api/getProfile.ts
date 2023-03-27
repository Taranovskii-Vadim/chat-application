import { User } from 'src/store/user/types';

import { CommonUserDTO, Method, Route } from './types';

class GetProfile implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/auth/profile';
  }

  getData({ id, name, lastname }: CommonUserDTO): User {
    return { id, fullname: `${lastname} ${name}` };
  }
}

export default new GetProfile();
