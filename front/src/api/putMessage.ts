import { CommonMessageDTO, Method, Route } from './types';

class PutMessage implements Route {
  method: Method = 'PUT';

  getUrl(): string {
    return '/messages';
  }

  getData(data: CommonMessageDTO) {}
}

export default new PutMessage();
