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

export interface Base<Data> {
  data: Data | undefined;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
