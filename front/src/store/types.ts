export type CommonChat = {
  id: number;
  title: string;
};

export type User = {
  id: number;
  fullname: string;
};

export type CommonMessage = {
  id: number;
  text: string;
  sender: User;
  createdAt: string;
};

export type Base<Data> = {
  data: U<Data>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};
