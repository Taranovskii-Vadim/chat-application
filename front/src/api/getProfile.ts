import { Profile } from 'src/store/user/types';

import { CommonUserDTO, Method, Route } from './types';

class GetProfile implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/user/profile';
  }

  getData({ id, name, lastname }: CommonUserDTO): Profile {
    return { id, fullname: `${lastname} ${name}` };
  }
}

export default new GetProfile();
