export type LoginPayload = {
  login: string;
  password: string;
};

export type AuthStore = {
  isLogged: boolean;
  logout: () => void;
  changeIsLogged: (value: boolean) => void;
  signIn: (payload: LoginPayload) => Promise<void>;
};
