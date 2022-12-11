export type User = {
  id: number;
  login: string;
  password: string;
};

export type SignUpDTO = Omit<User, 'id'>;
