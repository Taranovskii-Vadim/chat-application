export type FormValues = {
  login: string;
  password: string;
};

export interface Store {
  isLogged: boolean;

  logout: () => void;
  setIsLogged: (value: boolean) => void;
  login: (payload: FormValues) => Promise<void>;
}
