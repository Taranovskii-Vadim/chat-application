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
  replied?: {
    id: string;
    fullname: string;
  };
};

export type MessageRender = CommonMessage & {
  replied?: {
    id: string;
    fullname: string;
    text: string;
  };
  sender: {
    id: number;
    fullname: string;
  };
};
