export type Message = {
  id: number;
  text: string;
  createdAt: string;
  sender: { id: number; fullname: string };
};

export type CommonChat = {
  id: number;
  title: string;
};

export interface Base<Data> {
  data: Data | undefined;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}
