export type Payload = {
  login: string;
  password: string;
};

export interface Store {
  isLogged: boolean;

  logout: () => void;
  login: (payload: Payload) => Promise<void>;
}
