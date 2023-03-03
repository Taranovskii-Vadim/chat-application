import { Meta } from 'src/types';

import { Message } from 'src/message/message.entity';

export type ChatDB = {
  id: number;
  members: number[];
  unReadCount: number;
  lastMessageId?: string;
};

export type GetChatDTO = Meta & {
  id: number;
  title: string;
  companionId: number;
  unReadCount: number;
  lastMessage?: Message;
};
