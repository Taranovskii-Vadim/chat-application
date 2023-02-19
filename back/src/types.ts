import { Request } from 'express';

export type ReqUser = {
  id: number;
  name: string;
  login: string;
  lastname: string;
};

export type Req = { user: ReqUser } & Request;
