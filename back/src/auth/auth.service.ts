import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { SignUpDTO, User } from './types';

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    { id: 1, login: 'admin', password: 'admin' },
  ];

  signUp(payload: SignUpDTO): number {
    const id = this.users.length + 1;

    this.users.push({ id, ...payload });

    return id;
  }

  signIn({ login }: SignUpDTO): void {
    // console.log(payload);
  }
}

// import jwt from 'jsonwebtoken';
// import { Response, Request, Router } from 'express';

// import { User } from '../../types';
// import FileModel from '../../models/FileModel';

// import { formatError } from '../helpers';

// const router = Router();

// // 5 min
// const maxAge = 300000;
// // 1 min
// // const maxAge = 60000;

// router.post('/:login', async ({ params }: Request<{ login: string }>, res: Response) => {
//   try {
//     const { login } = params;

//     const users = await FileModel.getData<User[]>('users');
//     const result = users.find((item) => item.login === login);

//     if (!result) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const token = jwt.sign(result, process.env.JWT_KEY);

//     return res.cookie('token', token, { maxAge }).json();
//   } catch (e) {
//     return res.status(500).json(formatError(e.message));
//   }
// });

// export default router;
