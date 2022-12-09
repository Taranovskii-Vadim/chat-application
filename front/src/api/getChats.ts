import { Method, Route } from './types';

interface ResponseDTO {
  id: number;
  members: number[];
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/chats/user/${id}`;
  }

  getData(data: ResponseDTO[]): ResponseDTO[] {
    return data;
  }
}

export default new GetChats();
