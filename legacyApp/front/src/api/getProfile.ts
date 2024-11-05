import { User } from 'src/store/types';

import { mapUserDTO } from './helpers';
import { CommonUserDTO, Method, Route } from './types';

class GetProfile implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/user/profile';
  }

  getData(response: CommonUserDTO): User {
    return mapUserDTO(response);
  }
}

export default new GetProfile();
