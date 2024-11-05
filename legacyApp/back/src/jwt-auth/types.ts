import { ReqUser } from 'src/types';

export type JwtUser = { iat: number; exp: number } & ReqUser;

export type JwtResult = {
  access_token: string;
};
