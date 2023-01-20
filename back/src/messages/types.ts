type Common = {
  text: string;
  createdAt: Date;
};

type CommonMessage = Common & {
  id: string;
  chatId: number;
};

export type LastMessage = Common & {
  senderId: number;
};

export type Message = CommonMessage & {
  senderId: number;
};

export type MessageRender = CommonMessage & {
  sender: {
    id: number;
    fullname: string;
  };
};
