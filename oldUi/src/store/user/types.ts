export type User = {
  id: number;
  fullname: string;
  // TODO maybe in future we add fields avatar
};

// TODO can move as common type for chats and messages
export type Store = {
  isLoading: boolean;
  data: User | undefined;
  fetchData: () => Promise<void>;
  setIsLoading: (value: boolean) => void;
};
