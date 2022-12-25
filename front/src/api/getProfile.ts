import { User } from '../store/auth/types';

import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
}

class GetProfile implements Route {
  method: Method = 'GET';

  getUrl(): string {
    return '/auth/profile';
  }

  getData(data: ResponseDTO): User {
    return data;
  }
}

export default new GetProfile();
