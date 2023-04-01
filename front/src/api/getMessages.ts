import { formatDate } from 'src/utils';
import { CommonMessage } from 'src/store/types';

import { mapUserDTO } from './helpers';
import { Method, Route, MetaDTO, CommonUserDTO } from './types';

interface CommonMessageDTO extends MetaDTO {
  id: number;
  text: string;
  isEdited: boolean;
  isHidden: boolean;
  sender: CommonUserDTO;
  status: 'read' | 'unread';
  chat: { id: number; members: number[]; unReadCount: number } & MetaDTO;
}

class GetMessages implements Route {
  method: Method = 'GET';

  getUrl(id?: string): string {
    return `/messages/${id}`;
  }

  getData(data: CommonMessageDTO[]): CommonMessage[] {
    return data.map(({ createdAt, isEdited, chat, sender, text, id }) => ({
      id,
      text,
      // isEdited,
      // chatId: chat.id,
      sender: mapUserDTO(sender),
      createdAt: formatDate(createdAt),
      // TODO maybe create method in front, or add map in back with help of typeorm
      // replied: replied && {
      //   id: replied.id,
      //   text: replied.text,
      //   fullname: `${replied.sender.lastname} ${replied.sender.name}`,
      // },
    }));
  }
}

export default new GetMessages();
