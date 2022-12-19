import { Method, Route } from './types';
// import { Chat } from '../store/chats/types';

interface ResponseDTO {
  id: number;
  members: number[];
}

class GetChats implements Route {
  method: Method = 'GET';

  getUrl(id?: number): string {
    return `/chats/user/${id}`;
  }

  getData(data: ResponseDTO[]): any {
    return data;
  }
}

export default new GetChats();
