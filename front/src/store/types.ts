type Common<D, F> = {
  data: D | undefined;
  isLoading: boolean;
  fetchData: F;
  setIsLoading: (value: boolean) => void;
};

export type ObjectStore<D> = Common<D, (id: number) => Promise<void>>;

export type ListStore<D> = Common<D[], () => Promise<void>>;

export type CommonChat = {
  id: number;
  title: string;
  companionId: number;
};
