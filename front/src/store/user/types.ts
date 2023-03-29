export type Profile = {
  id: number;
  fullname: string;
};

export interface Store {
  socket: unknown;
  isLoading: boolean;
  data: Profile | undefined;
  fetchData: () => Promise<void>;
  setIsLoading: (value: boolean) => void;
}
